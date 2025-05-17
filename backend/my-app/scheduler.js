import nc from "node-cron";
// function logMessage(){
//     console.log("This si a cron job executed by node-cron in nodejs")
// }

function fetchDate(){
     const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');     
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const year = date.getFullYear(); 
    const formattedDate=console.log(`${year}/${month}/${day}`);
}
fetchDate()