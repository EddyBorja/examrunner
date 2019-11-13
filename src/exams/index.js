import sec from './SECURITYPLUS';
import ports from './commonPorts';

let exams = [];

//push exams imported above into the array
if(sec) { exams.push(sec) };
exams.push(ports);

export default exams;
