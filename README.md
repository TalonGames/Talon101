# TalonGames
## Break the filters. Access the web.
Talon was made for countries with heavy censorship, not to play games in class. I only added games so people can enjoy entertainment when their country doesn't want them to have access to it.

## ⚙️ How It Works
If you're wondering what's happening under the hood, here’s the breakdown of how TalonGames handles your requests:

The Request: When you enter a URL, the frontend captures that input.

The Proxy Layer: Instead of your browser reaching out directly to a blocked site, the request is routed through proxy scripts (managed in config.js and the sw.js service worker).

Rewriting the Web: The proxy fetches the site’s data and "rewrites" it. This ensures that links, images, and scripts on the target site continue to work within the proxy environment without "leaking" back to your real IP.

The Result: The site loads inside the Talon interface.

## 📂 What’s Inside?
I’ve organized the repo to be as modular as possible:

components/ – Reusable UI pieces, like the footer.js I just updated.

scripts/ – The brains. Check out featured.js for the most popular links used.

styles/ – Custom CSS. I’ve been tweaking search.css to make the discovery experience feel a lot smoother.

sw.js – The Service Worker. This is crucial for performance and making sure the proxy feels snappy.

config.js – The "control center" where all the main settings live.

## ⚠️ Known Issues
Performance & Lag
Since this is a solo project and proxying heavy web traffic is resource-intensive, you might experience some lag or slow load times on media-heavy sites. This is usually due to the rewriting engine processing large scripts or high-resolution assets in real-time. I'm looking into ways to optimize this. Also singlefile doesn't work so just use the whole repo like said here is a link I made https://talon101.vercel.app/.

## 🛡️ Disclaimer
Important: Please do not use this tool in a school or workplace environment unless you have explicit permission to do so. This was built for freedom of information, but please use it responsibly.

## 💬 Support & Community
If you run into bugs or have questions, you can reach out to me:

Discord: keystone.here

Join the Server: [Click here to join the Discord](https://discord.gg/VMYGhAEqcD)

## 🚀 Getting it Running
Since this is a solo project, I've kept the setup pretty straightforward:

Grab the code: git clone https://github.com/TalonGames/TalonGames.git

Point and Click: You can host this on basically anything—GitHub Pages, Vercel, or your own VPS.

Customize: Pop into config.js if you want to change how the proxy behaves.

## 👤 The Solo Journey
This project is entirely a solo effort by me (Keystone). From the initial index.html to the complex service worker logic, I’ve handled the design, the backend routing, and the constant cat-and-mouse game of bypassing filters.

I’m always updating it (as you can see from the recent featured.js and footer.js commits), so stay tuned for more.

## 📄 License
Keeping it open: PolyForm Noncommercial License 1.0.0 License. Check the LICENSE file if you're curious about the legal bits.
Modified from Phantom here is a link back to the official repo is https://github.com/Destroyed12121/Phantom101.
