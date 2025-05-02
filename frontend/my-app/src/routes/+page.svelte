<script lang="ts">
  import { z } from 'zod';
 import { onMount } from 'svelte';
 import { error, json } from '@sveltejs/kit';
 let form = {
 name: '',
 yourEmail: '',
 recipientEmail: '',
 date: ''
  };
 let errors: Record<string, string[] | undefined> = {};
 let submitted = false;
 const schema = z.object({
 name: z.string().min(1, 'Name is required'),
 yourEmail: z.string().email('Invalid email address'),
 recipientEmail: z.string().email('Invalid recipient email'),
 date: z.string().min(1, 'Date is required')
  });
 const validate = () => {
 const result = schema.safeParse(form);
 if (!result.success) {
 errors = result.error.formErrors.fieldErrors;
 return false;
  } else {
 errors = {};
 return true;
  }
  };
 const handleSubmit = async (e: Event) => {
 e.preventDefault();
 if (!validate()) {
 return false;
  }
 try {
 const reponse = await fetch("http://localhost:3000/data", {
 method: "POST",
 headers: {
 "Content-Type": "application/json"
  },
 body: JSON.stringify(form)
  });
 if (reponse.ok) {
 submitted = true;
  } else {
 const errorMessage = await reponse.text();
 console.log("Form submission failed!!!", errorMessage);
  }
  } catch (error) {
 console.log(error);
  }
  };
 </script>
 
 <style>
   form {
     max-width: 500px;
     margin: 40px auto;
     padding: 24px;
     background-color: white;
     border-radius: 8px;
     box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
   }
 
   div {
     margin-bottom: 20px;
   }
 
   label {
     display: block;
     margin-bottom: 6px;
     font-weight: 600;
   }
 
   input {
     width: 100%;
     padding: 10px 12px;
     border: 1px solid #ccc;
     border-radius: 4px;
     font-size: 16px;
     margin-top: 5px;
   }
 
   input:focus {
     outline: none;
     border-color: #4a90e2;
     box-shadow: 0 0 0 2px rgba(74, 144, 226, 0.2);
   }
 
   span {
     display: block;
     color: #e53e3e;
     font-size: 14px;
     margin-top: 5px;
   }
 
   
   button {
     width: 100%;
     background-color: #3b82f6;
     color: white;
     border: none;
     border-radius: 4px;
     padding: 12px;
     font-size: 16px;
     font-weight: 500;
     cursor: pointer;
     transition: background-color 0.2s;
   }
 
   button:hover {
     background-color: #2563eb;
   }
 
   p {
     color: #10b981;
     text-align: center;
     margin-top: 16px;
     font-weight: 500;
   }
 </style>
 
 <form on:submit|preventDefault={handleSubmit} novalidate>
 <div>
 <label>
  Name:
 <input
 type="text"
 bind:value={form.name}
 />
 </label>
  {#if errors.name}
 <span>{errors.name}</span>
  {/if}
 </div>
 <div>
 <label>
  Your Email:
 <input
 type="email"
 bind:value={form.yourEmail}
 />
 </label>
  {#if errors.yourEmail}
 <span>{errors.yourEmail}</span>
  {/if}
 </div>
 <div>
 <label>
  Recipient's Email:
 <input
 type="email"
 bind:value={form.recipientEmail}
 />
 </label>
  {#if errors.recipientEmail}
 <span>{errors.recipientEmail}</span>
  {/if}
 </div>
 <div>
 <label>
  Calendar:
 <input
 type="date"
 bind:value={form.date}
 />
 </label>
  {#if errors.date}
 <span>{errors.date}</span>
  {/if}
 </div>
 <button type="submit">
  Submit
 </button>
 </form>
 {#if submitted}
 <p>Form submitted successfully!</p>
 {/if}