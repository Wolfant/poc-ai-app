import  getChatCompletion  from '@/api/ChatGpt';

export async function chatService(): Promise<any> {
    const chatCompletion = await getChatCompletion().then((response) => {
        return response;
    }).catch((error) => {
        console.error(error);
    });
    return chatCompletion;
};
