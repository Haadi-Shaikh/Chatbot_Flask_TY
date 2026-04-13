import os
from openai import OpenAI

HF_TOKEN = os.environ.get("HF_TOKEN")

client = OpenAI(
    base_url="https://router.huggingface.co/v1",
    api_key=HF_TOKEN,
)

def get_bot_response(user_message: str) -> str:
    if not HF_TOKEN:
        raise ValueError("HF_TOKEN environment variable is not set.")

    try:
        completion = client.chat.completions.create(
            model="meta-llama/Llama-3.1-8B-Instruct:cerebras",
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": user_message}
            ],
            max_tokens=512,
            temperature=0.7,
        )
        return completion.choices[0].message.content.strip()

    except Exception as e:
        # Print full error detail to terminal
        import traceback
        traceback.print_exc()
        raise RuntimeError(str(e))
