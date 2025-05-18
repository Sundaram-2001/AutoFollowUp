import nc from "node-cron";
import dotenv from "dotenv";
dotenv.config();
import { createClient  } from "@supabase/supabase-js";
const db_url=process.env.DATABASE_URL
const supabase=createClient(
    process.env.SUPABASE_URL,
    process.env.ANON_KEY
)
const scheduled_date=fetchDate()
const {data,error}=await supabase .from('Details').select('yourEmail').eq('date',scheduled_date)
if(error){
    console.log("Error fetching the DB",error)
}
else{
    // const email=data[0].email
    console.log("Successfully fetched the data",data)
}
function fetchDate(){
     const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');     
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const year = date.getFullYear(); 
    return (`${year}-${month}-${day}`);
}

