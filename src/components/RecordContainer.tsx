import { memo } from 'react';
import { TInputRecord } from '@/types/TSnowTerminal';

import {
  Date,
  History,
  Weather,
  HelpNode,
  InfoNode,
  Shortcut,
  Time,
  Varbook,
  Gobang,
} from '@/components/index';
import { HelpInstructNode } from './Help';

type TProps = {
  currentRecord: TInputRecord[];
  historyRecord: TInputRecord[];
  hostname: string;
};

// @ts-ignore
export default memo(({ currentRecord, historyRecord, hostname }: TProps) => {
  return currentRecord.map((rec, index) => (
    <div key={rec.id}>
      {rec.type === 'INSTRUCT' ? (
        <p key={rec.id}>
          <span>[{hostname}]$ </span>
          <span>{rec.instruct}</span>
        </p>
      ) : rec.type === 'ERROR_TEXT' ? (
        <div className=' text-white flex items-center my-1'>
          <div className=' bg-red-600 px-2 text-white mr-2'>error</div>{' '}
          {rec.instruct}
        </div>
      ) : rec.type === 'SUCCESS_TEXT' ? (
        <div className=' text-white flex items-center my-1'>
          <div className=' bg-green-600 px-2 text-white mr-2'>success</div>
          {rec.instruct}
        </div>
      ) : rec.type === 'HELP' ? (
        <HelpNode />
      ) : rec.type === 'INFO' ? (
        <InfoNode />
      ) : rec.type === 'WEATHER' ? (
        <Weather weather={rec.result} />
      ) : rec.type === 'HISTORY' ? (
        <History history={historyRecord} index={index} />
      ) : rec.type === 'DATE' ? (
        <Date />
      ) : rec.type === 'INSTRUCT_ITEM_HELP' ? (
        <HelpInstructNode helpKey={rec.helpKey!} />
      ) : rec.type === 'SHORTCUT' ? (
        <Shortcut />
      ) : rec.type === 'TIME' ? (
        <Time />
      ) : rec.type === 'VAR_BOOK' ? (
        <Varbook book={rec.result} />
      ) : rec.type === 'GAME_Gobang' ? (
        <Gobang />
      ) : null}
    </div>
  ));
  // <div key={rec.id}>
  // 	{rec.type === 'INSTRUCT' ? (
  // 		<p key={rec.id}>
  // 			<span>[local]$ </span>
  // 			<span>{rec.instruct}</span>
  // 		</p>
  // 	) : rec.type === 'ERROR_TEXT' ? (
  // 		<div className=" text-white flex items-center my-1">
  // 			<div className=" bg-red-600 px-2 text-white mr-2">error</div>{' '}
  // 			{rec.instruct}
  // 		</div>
  // 	) : rec.type === 'SUCCESS_TEXT' ? (
  // 		<div className=" text-white flex items-center my-1">
  // 			<div className=" bg-green-600 px-2 text-white mr-2">success</div>
  // 			{rec.instruct}
  // 		</div>
  // 	) : rec.type === 'HELP' ? (
  // 		helpNode
  // 	) : rec.type === 'INFO' ? (
  // 		InfoNode
  // 	) : rec.type === 'WEATHER' ? (
  // 		<Weather weather={rec.result} />
  // 	) : rec.type === 'HISTORY' ? (
  // 		<History history={historyRecord} index={index} />
  // 	) : rec.type === 'DATE' ? (
  // 		<Date />
  // 	) : null}
  // </div>
});
