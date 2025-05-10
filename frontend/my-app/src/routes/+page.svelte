
<script>
  import { z } from 'zod';
  import { superForm } from 'sveltekit-superforms/client';
  import { zodClient } from 'sveltekit-superforms/adapters';

  // Define the schema for form validation
  const formSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters" }),
    yourEmail: z.string().email({ message: "Please enter a valid email address" }),
    recipientEmail: z.string().email({ message: "Please enter a valid recipient email" }),
    date: z.string().refine(val => !isNaN(Date.parse(val)), {
      message: "Please enter a valid date",
    }),
  });

  // Use superForm to handle the form
  const { form, errors, enhance, submitting } = superForm(
    { name: '', yourEmail: '', recipientEmail: '', date: new Date().toISOString().slice(0, 10) },
    { validators: zodClient(formSchema) }
  );
</script>

<div class="form-container">
  <h1>Email followup</h1>
  
  <form method="POST" use:enhance>
    <div class="form-group">
      <label for="name">Name</label>
      <input 
        type="text" 
        id="name" 
        bind:value={$form.name} 
        class:error={$errors.name}
      />
      {#if $errors.name}<span class="error-message">{$errors.name}</span>{/if}
    </div>
    
    <div class="form-group">
      <label for="yourEmail">Your Email</label>
      <input 
        type="email" 
        id="yourEmail" 
        bind:value={$form.yourEmail} 
        class:error={$errors.yourEmail}
      />
      {#if $errors.yourEmail}<span class="error-message">{$errors.yourEmail}</span>{/if}
    </div>
    
    <div class="form-group">
      <label for="recipientEmail">Recipient Email</label>
      <input 
        type="email" 
        id="recipientEmail" 
        bind:value={$form.recipientEmail} 
        class:error={$errors.recipientEmail}
      />
      {#if $errors.recipientEmail}<span class="error-message">{$errors.recipientEmail}</span>{/if}
    </div>
    
    <div class="form-group">
      <label for="date">Date</label>
      <input 
        type="date" 
        id="date" 
        bind:value={$form.date} 
        class:error={$errors.date}
      />
      {#if $errors.date}<span class="error-message">{$errors.date}</span>{/if}
    </div>
    
    <button type="submit" disabled={$submitting}>
      {$submitting ? 'Submitting...' : 'Submit'}
    </button>
  </form>
</div>

<style>
  .form-container {
    max-width: 500px;
    margin: 0 auto;
    padding: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
  }

  h1 {
    text-align: center;
    margin-bottom: 20px;
  }

  .form-group {
    margin-bottom: 15px;
  }

  label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  }

  input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 16px;
  }

  input.error {
    border-color: #ff3e3e;
  }

  .error-message {
    color: #ff3e3e;
    font-size: 14px;
    margin-top: 5px;
    display: block;
  }

  button {
    background-color: #4caf50;
    color: white;
    border: none;
    padding: 10px 15px;
    font-size: 16px;
    cursor: pointer;
    border-radius: 4px;
    width: 100%;
    margin-top: 10px;
  }

  button:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
</style>