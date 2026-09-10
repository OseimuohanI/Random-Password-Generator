# Random Password Generator

A small, single-page password generator. Built for personal use.

**Live:** https://oseimuohani.github.io/Random-Password-Generator/

## Usage

Provide query parameters in the URL to generate a password. If no parameters are provided, you'll see an instruction page.

### Parameters

| Parameter | Type | Description |
|---|---|---|
| `length` | integer | Password length (e.g., `16`) |
| `uppercase` | true/false | Include uppercase letters |
| `lowercase` | true/false | Include lowercase letters |
| `numbers` | true/false | Include numbers |
| `special` | true/false | Include special characters |

### Example

```
?length=16&uppercase=true&lowercase=true&numbers=true&special=true
```

## License

MIT
