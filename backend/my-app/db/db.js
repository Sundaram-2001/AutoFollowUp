import pkg from '@prisma/client';
const { PrismaClient } = pkg;
const prisma = new PrismaClient();

const formatDateString = (dateStr) => {
  const [day, month, year] = dateStr.split('-');
  return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
};

export async function addData(data) {
  try {
    const { name, yourEmail, recipientEmail, date } = data;

    let formattedDate;
    if (date.includes('T')) {
      formattedDate = date.split('T')[0];
    } else if (date.includes('-') && date.split('-')[0].length === 4) {
      formattedDate = date;
    } else {
      formattedDate = formatDateString(date);
    }

    const result = await prisma.details.create({
      data: {
        name,
        yourEmail,
        recipientEmail,
        date: formattedDate,
      },
    });

    return { success: true, message: "Data Inserted Successfully!!!" };

  } catch (error) {
    console.error('Database error:', error);
    return { success: false, error: error.message };
  }
}
