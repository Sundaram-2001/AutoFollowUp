<script>
// @ts-nocheck

  let name = '';
  let yourEmail = '';
  let recipientEmail = '';
  let date = '';

  async function handleSubmit(e) {
    e.preventDefault(); 

    const data = {
      name,
      yourEmail,
      recipientEmail,
      date
    };

    const res = await fetch('http://localhost:3000/data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    const result = await res.json();
    console.log(result);
    alert(result.message);
  }
</script>

<form on:submit={handleSubmit}>
  <label>
    Your name:
    <input type="text" bind:value={name} name="name" required />
  </label>

  <label>
    Your email:
    <input type="email" bind:value={yourEmail} name="yourEmail" required />
  </label>

  <label>
    Recipient email:
    <input type="email" bind:value={recipientEmail} name="recipientEmail" required />
  </label>

  <label>
    Date:
    <input type="date" bind:value={date} name="date" required />
  </label>

  <button type="submit">Send</button>
</form>
