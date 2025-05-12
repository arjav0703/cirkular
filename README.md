# Cirkular

### Prerequisites

Before you begin, ensure you have met the following requirements:
- Git installed on your system
- A text editor or IDE of your choice

### Development Setup

You have two options for setting up the development environment:

#### 1. Using Nix (Recommended)

If you have Nix package manager installed, you can quickly set up all dependencies with a single command:

```bash
nix-shell
```
This will create a development shell with all required dependencies installed automatically.
Not familiar with Nix? Learn more about Nix [here](https://nixos.org).
#### 2. Manual Setup
If you prefer to set up manually, follow these steps:
1. Install [Node.js](https://nodejs.org/en/download/). Version 23.x is recommended
2. Verify installation:
3. node --version
4. Clone the repository:
```bash
git clone https://github.com/your-username/cirkular.git
cd cirkular
```

5. Install project dependencies:
```bash
npm install
```

---
Note: The currentUI part was vibe-coded as i was focusing on the core functioning of the app + AI integration. The actual UI is yet to be implemented.
