import {coachScenario} from '../src/scenarios.mjs';

// Input is untrusted JSON text; return true only for the exact scenario contract.
export function acceptAnswer(text,scenarioId){
  try {
    const scenario=coachScenario(scenarioId);
    if(!scenario)return false;
    const answer=JSON.parse(text);
    if(!answer||typeof answer!=='object'||Array.isArray(answer))return false;
    const fields=['kind','ruleId','cardId','explanation'];
    if(Object.keys(answer).length!==fields.length||!fields.every(field=>Object.hasOwn(answer,field)))return false;
    return answer.kind===scenario.kind&&answer.ruleId===scenario.rule&&
      answer.cardId===(scenario.kind==='suggest'?'practice-red-3':null)&&
      typeof answer.explanation==='string'&&
      answer.explanation.length>=10&&answer.explanation.length<=1200;
  }
  catch{return false;}
}
