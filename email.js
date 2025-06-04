const axios = require('axios');

async function testTempMail() {
    try {
        // 1. 生成临时邮箱
        const mailboxResponse = await axios.get('https://www.linshiyouxiang.net/api_v1/email/mailbox?domain=random&quantity=1');
        const mailboxData = mailboxResponse.data;
        
        if (mailboxData.status === 1) {
            const email = mailboxData.mailbox[0];
            console.log(`生成的临时邮箱: ${email}`);
            
            // 2. 等待接收并读取邮件
            const apiKey = "32492e2d23c7a6e7c85300c1";
            const senderEmail = "noreply@sendtestemail.com";
            
            const readUrl = `https://www.linshiyouxiang.net/api_v1/email/readMessage?api_key=${apiKey}&email=${encodeURIComponent(email)}&sender_email=${encodeURIComponent(senderEmail)}&time=PAST_1_HOUR&delete_after_read=false`;
            
            // 在实际应用中，您可能需要轮询检查邮件是否到达
            console.log("等待10秒，确保邮件已送达...");
            await new Promise(resolve => setTimeout(resolve, 10000));
            
            const readResponse = await axios.get(readUrl);
            const readData = readResponse.data;
            
            if (readData.id) {
                console.log(`收到邮件，主题: ${readData.subject}`);
                console.log(`内容: ${readData.content}`);
            } else {
                console.log("未收到邮件或正在等待邮件到达");
            }
        } else {
            console.log("创建临时邮箱失败");
        }
    } catch (error) {
        console.error("请求失败:", error.message);
    }
}

testTempMail();
