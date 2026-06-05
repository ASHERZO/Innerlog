const ALLOWED_ORIGIN = 'https://asherzo.github.io';

const TARGETS = {
  'openai-chat': 'https://api.openai.com/v1/chat/completions',
  'openai-whisper': 'https://api.openai.com/v1/audio/transcriptions',
  'hf-sentiment': 'https://router.huggingface.co/hf-inference/models/cardiffnlp/twitter-roberta-base-sentiment-latest',
  'hf-ser': null, // dynamic — model passed as param
};

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export default {
  async fetch(request) {

    // Preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: CORS_HEADERS });
    }

    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 });
    }

    const url = new URL(request.url);
    const target = url.searchParams.get('target');

    let targetUrl = TARGETS[target];

    // Dynamic HF SER model
    if (target === 'hf-ser') {
      const model = url.searchParams.get('model');
      if (!model) return new Response('Missing model param', { status: 400 });
      targetUrl = `https://router.huggingface.co/hf-inference/models/${model}`;
    }

    if (!targetUrl) {
      return new Response('Invalid target', { status: 400 });
    }

    // Forward request
    const response = await fetch(targetUrl, {
      method: 'POST',
      headers: request.headers,
      body: request.body,
    });

    // Return with CORS headers
    const newResponse = new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    });
    Object.entries(CORS_HEADERS).forEach(([k, v]) => newResponse.headers.set(k, v));
    return newResponse;
  }
};
