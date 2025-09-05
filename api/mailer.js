// api/mailer.js
export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const { name, email, message } = req.body;

    try {
        const response = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                from: "onboarding@resend.dev", // bisa ganti domain verified kamu
                to: "ariiq.i.alfajri@gmail.com", // email tujuan
                subject: `New Contact from ${name}`,
                html: `
          <h3>New Contact Form Submission</h3>
          <p><b>Name:</b> ${name}</p>
          <p><b>Email:</b> ${email}</p>
          <p><b>Message:</b> ${message}</p>
        `,
            }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            return res.status(500).json({ error: errorText });
        }

        return res.status(200).json({ success: true });
    } catch (err) {
        console.error("Mailer error:", err);
        return res.status(500).json({ error: "Failed to send email" });
    }
}
