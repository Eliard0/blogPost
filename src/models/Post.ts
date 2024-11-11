export interface Post {
    id: number;
    title: string;
    body: string;
  }

  export type Comment = {
    id: number;
    userId: number;
    userName: string;
    profileImageUrl: string;
    text: string;
};

export type PostData = {
    title: string;
    body: string;
    userId: number;
};

export async function createPost(data: PostData): Promise<any> {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error('Erro ao criar o post');
    }

    return response.json();
}