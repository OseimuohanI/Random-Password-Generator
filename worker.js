export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const params = url.searchParams;

    if (Array.from(params.keys()).length === 0) {
      const instructions = `Usage instructions:

Provide query parameters in the URL to generate a password.

Parameters:
- length: integer (e.g., 16)
- uppercase: true or false
- lowercase: true or false
- numbers: true or false
- special: true or false
- format: "json" (optional, outputs result as JSON string. Also adapts to 'Accept: application/json' headers)

Example Usage:
?length=16&uppercase=true&lowercase=true&numbers=true&special=true
`;
      return new Response(instructions, {
        headers: { 'Content-Type': 'text/plain' },
      });
    }

    const lengthParam = params.get('length');
    const length = lengthParam ? parseInt(lengthParam, 10) : 16;

    const uppercase = params.get('uppercase') === 'true';
    const lowercase = params.get('lowercase') === 'true';
    const numbers = params.get('numbers') === 'true';
    const special = params.get('special') === 'true';
    const format = params.get('format');

    const wantsJson = format === 'json' || request.headers.get('accept')?.includes('application/json');

    let charset = '';
    if (uppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (lowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (numbers) charset += '0123456789';
    if (special) charset += '!@#$%^&*()_+~`|}{[]:;?><,./-=';

    if (charset === '') {
      const errorMsg = 'Error: You must select at least one character set (e.g., uppercase=true).';

      if (wantsJson) {
        return new Response(JSON.stringify({ error: errorMsg }), {
          headers: { 'Content-Type': 'application/json' },
          status: 400
        });
      }
      return new Response(errorMsg, {
        headers: { 'Content-Type': 'text/plain' },
        status: 400
      });
    }

    let password = '';
    const randomValues = new Uint32Array(length);
    crypto.getRandomValues(randomValues);

    for (let i = 0; i < length; i++) {
        password += charset[randomValues[i] % charset.length];
    }

    if (wantsJson) {
      return new Response(JSON.stringify({ password }), {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
      });
    }

    return new Response(password, {
      headers: {
        'Content-Type': 'text/plain',
        'Access-Control-Allow-Origin': '*'
      },
    });
  },
};
