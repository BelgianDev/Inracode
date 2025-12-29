import {type Block, BlockSvg, Connection, Extensions, type Workspace} from "blockly/core";
import {SwitchBlock as ActualSwitchBlock} from "../script/editor/blocks/logic/SwitchBlock.ts";
import {SwitchHeadBlock} from "../script/editor/blocks/mutator/switch/SwitchHeadBlock.ts";
import {SwitchCaseBlock} from "../script/editor/blocks/mutator/switch/SwitchCaseBlock.ts";
import {SwitchDefaultBlock} from "../script/editor/blocks/mutator/switch/SwitchDefaultBlock.ts";

type SwitchBlock = Block & SwitchMixin;
interface SwitchMixin extends SwitchMixinType {}
type SwitchMixinType = typeof SWITCH_MUTATOR_MIXIN;

interface SwitchElementBlock extends Block {
    valueConnection_: Connection | null;
    statementConnection_: Connection | null;
}

const SWITCH_MUTATOR_MIXIN = {
    caseCount_: 0,
    hasDefault_ : false,

    saveExtraState: function(this: SwitchBlock) {
        return {
            'caseCount': this.caseCount_,
            'hasDefault': this.hasDefault_
        };
    },

    loadExtraState: function(this: SwitchBlock, savedState: any) {
        this.caseCount_ = savedState['caseCount'] || 0;
        this.hasDefault_ = savedState['hasDefault'];

        this.updateShape_();
    },

    decompose: function(this: SwitchBlock, workspace: Workspace): Block {
        const topBlock = workspace.newBlock(SwitchHeadBlock.IDENTIFIER) as BlockSvg;
        topBlock.initSvg();

        let connection = topBlock.nextConnection!;
        for (let i = 0; i < this.caseCount_; i++) {
            const caseBlock = workspace.newBlock(SwitchCaseBlock.IDENTIFIER) as BlockSvg;
            caseBlock.initSvg();
            connection.connect(caseBlock.previousConnection!);
            connection = caseBlock.nextConnection!;
        }

        if (this.hasDefault_) {
            const defaultBlock = workspace.newBlock(SwitchDefaultBlock.IDENTIFIER) as BlockSvg;
            defaultBlock.initSvg();
            connection.connect(defaultBlock.previousConnection!);
        }

        return topBlock;
    },

    compose: function(this: SwitchBlock, topBlock: BlockSvg) {
        let block = topBlock.nextConnection!.targetBlock() as SwitchElementBlock | null;

        this.caseCount_ = 0;
        this.hasDefault_ = false;

        const valueConnections: Array<Connection | null> = [];
        const statementConnections: Array<Connection | null> = [];
        let defaultStatementConnection: Connection | null = null;

        while (block) {
            if (block.isInsertionMarker()) {
                block = block.getNextBlock() as SwitchElementBlock | null;
                continue;
            }

            switch (block.type) {
                case SwitchCaseBlock.IDENTIFIER:
                    this.caseCount_++;
                    valueConnections.push(block.valueConnection_);
                    statementConnections.push(block.statementConnection_);
                    break;

                case SwitchDefaultBlock.IDENTIFIER:
                    this.hasDefault_ = true;
                    defaultStatementConnection = block.statementConnection_ as Connection | null;
                    break;

                default:
                    throw TypeError('Unknown block type: ' + block.type);
            }

            block = block.getNextBlock() as SwitchElementBlock | null;
        }

        this.updateShape_();
        this.reconnectChildBlocks_(valueConnections, statementConnections, defaultStatementConnection);
    },

    saveConnections: function(this: SwitchBlock, block: Block) {
        let entryBlock = block!.nextConnection!.targetBlock() as SwitchElementBlock | null;
        let i = 0;

        while (entryBlock) {
            if (entryBlock.isInsertionMarker()) {
                entryBlock = entryBlock.getNextBlock() as SwitchElementBlock | null;
                continue;
            }
            switch (entryBlock.type) {
                case SwitchCaseBlock.IDENTIFIER: {
                    const inputIf = this.getInput(ActualSwitchBlock.CASE_MEMBER + i);
                    const inputDo = this.getInput(ActualSwitchBlock.DO_MEMBER + i);
                    entryBlock.valueConnection_ = inputIf && inputIf.connection!.targetConnection;
                    entryBlock.statementConnection_ = inputDo && inputDo.connection!.targetConnection;

                    i++;
                    break;
                }
                case SwitchDefaultBlock.IDENTIFIER: {
                    const inputDo = this.getInput(ActualSwitchBlock.DEFAULT_MEMBER);
                    entryBlock.statementConnection_ = inputDo && inputDo.connection!.targetConnection;
                    break;
                }
                default:
                    throw TypeError('Unknown block type: ' + entryBlock.type);
            }

            entryBlock = entryBlock.getNextBlock() as SwitchElementBlock | null;
        }
    },

    updateShape_: function(this: SwitchBlock) {
        if (this.getInput(ActualSwitchBlock.DEFAULT_MEMBER)) {
            this.removeInput(ActualSwitchBlock.DEFAULT_MEMBER);
        }

        for (let i = 0; this.getInput(ActualSwitchBlock.CASE_MEMBER + i); i++) {
            this.removeInput(ActualSwitchBlock.CASE_MEMBER + i);
            this.removeInput(ActualSwitchBlock.DO_MEMBER + i);
        }

        for (let i = 0; i < this.caseCount_; i++) {
            this.appendValueInput(ActualSwitchBlock.CASE_MEMBER + i).appendField('case');
            this.appendStatementInput(ActualSwitchBlock.DO_MEMBER + i).appendField('do');
        }

        if (this.hasDefault_) {
            this.appendStatementInput(ActualSwitchBlock.DEFAULT_MEMBER).appendField('default');
        }
    },

    reconnectChildBlocks_: function(this: SwitchBlock, valueConnections: Array<Connection | null>, statementConnections: Array<Connection | null>, defaultStatementConnection?: Connection | null) {
        for (let i = 0; i < this.caseCount_; i++) {
            valueConnections[i]?.reconnect(this, ActualSwitchBlock.CASE_MEMBER + i);
            statementConnections[i]?.reconnect(this, ActualSwitchBlock.DO_MEMBER + i);
        }

        defaultStatementConnection?.reconnect(this, ActualSwitchBlock.DEFAULT_MEMBER);
    }
}

Extensions.registerMutator(
    ActualSwitchBlock.SWITCH_MUTATOR,
    SWITCH_MUTATOR_MIXIN,
    null as unknown as undefined,
    [SwitchHeadBlock.IDENTIFIER, SwitchCaseBlock.IDENTIFIER, SwitchDefaultBlock.IDENTIFIER],
)