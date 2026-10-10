const projectListJson = {
    "professional": [
        {
            "title": "4D Web Shop",
            "subtitle": "PHP, WordPress, WooCommerce, JavaScript, SCSS",
            "description": "E-commerce platform built as a WordPress/WooCommerce plugin and theme, synchronized with the 4D Wand ERP: live stock and pricing, B2B price lists, advanced shipping rules, payment integrations, CSV import/export and a form builder. I lead the team developing it, own the architecture, review the team's pull requests and write a large share of the code."
        },
        {
            "title": "4D Wand IMC - mobile application",
            "subtitle": "C#, .NET MAUI (.NET 10), SQLite, Android, iOS",
            "description": "Cross-platform mobile app for inventory, order picking, point of sale, returns and barcode scanning, with offline storage and biometric login. Led its migration from Xamarin.Forms to .NET MAUI, including support for dedicated hardware scanners.",
            "links": [
                {
                    "url": "https://play.google.com/store/apps/details?id=com.x4d.scanner",
                    "icon": "android",
                    "text": "Android"
                },
                {
                    "url": "https://apps.apple.com/hr/app/4d-wand-imc/id1407622866",
                    "icon": "apple",
                    "text": "iOS"
                }
            ]
        },
        {
            "title": "Document exchange platform",
            "subtitle": ".NET MAUI, Rust, Axum, SQL",
            "description": "Platform for sending documents to a company, organized into cases: a .NET MAUI mobile app with QR-code onboarding, PIN and biometric protection, backed by a Rust REST API. Led the planning and architecture."
        },
        {
            "title": "WebSocket Service",
            "subtitle": "C#, .NET 8 (Native AOT), Minimal API, xUnit",
            "description": "Gateway that turns REST requests into WebSocket messages, connecting web and mobile clients to the ERP. Persistent connections with automatic reconnects, health checks, request validation and a host allow-list, published as a native Linux binary."
        },
        {
            "title": "Real-time messaging server",
            "subtitle": "Rust, Tokio, Axum, WebSockets",
            "description": "WebSocket server with group and channel subscriptions, secure WSS with automatic certificate reload and graceful shutdown. Contributed performance improvements to message delivery and the deployment setup."
        },
        {
            "title": "Release notes service",
            "subtitle": "PHP, WordPress, REST API",
            "description": "WordPress plugin that stores product version histories in dedicated database tables and publishes release notes and latest versions through a REST API, with an admin interface for managing them."
        },
        {
            "title": "4D Loyalty",
            "subtitle": "C#, .NET MAUI (.NET 10), SQLite, Android, iOS",
            "description": "Cross-platform mobile app for storing and quickly accessing loyalty program cards or any other barcodes, available offline.",
            "links": [
                {
                    "url": "https://play.google.com/store/apps/details?id=com.x4d.loyalty",
                    "icon": "android",
                    "text": "Android"
                },
                {
                    "url": "https://apps.apple.com/hr/app/4d-loyalty/id6472644910",
                    "icon": "apple",
                    "text": "iOS"
                }
            ]
        },
        {
            "title": "4D Wand IMC - web shop",
            "subtitle": "C#, ASP.NET MVC 4, EF4, MSSQL, Bootstrap, jQuery",
            "description": "Universal web shop application that seamlessly synchronizes data with a proprietary ERP software system.",
            "links": [
                {
                    "url": "https://katalog06.4d.hr",
                    "icon": "globe",
                    "text": "Preview"
                }
            ]
        },
        {
            "title": "WandStat",
            "subtitle": "C#, ASP.NET MVC 4, EF4, MSSQL, Bootstrap, jQuery",
            "description": "Web application dedicated for collecting telemetry data from users of proprietary ERP software system."
        },
        {
            "title": "4D WatchDog Service",
            "subtitle": "C#, .NET Framework 4.8",
            "description": "Windows service responsible for monitoring application lifecycles, ensuring the continuous and scheduled execution of watched applications."
        },
        {
            "title": "Fresh Service",
            "subtitle": "C#, ASP.NET Core 5, EF6, MSSQL, Bootstrap, jQuery",
            "description": "Centralized web application with a primary focus on license verification and seamless distribution of updated versions of proprietary ERP software. Additionally, an internal document and data sharing service."
        }
    ],
    "private": [
        {
            "title": "Battleship multiplayer",
            "subtitle": "C#, ASP.NET Core, SignalR, Vue 3, SQLite",
            "description": "Real-time online multiplayer Battleship with several game modes (classic, rapid and blitz with increment), server-side game state that prevents cheating, a mobile-friendly interface, automated tests and CI, self-hosted behind Nginx.",
            "links": [
                {
                    "url": "https://battleship.luka-pejakovic.from.hr",
                    "icon": "globe",
                    "text": "Play"
                }
            ]
        },
        {
            "title": "Personal portfolio page",
            "subtitle": "HTML, CSS, JavaScript",
            "description": "This single-page portfolio, built without frameworks: self-hosted fonts and libraries, inline SVG icons, a strict Content-Security-Policy and no third-party requests.",
            "links": [
                {
                    "url": "https://luka-pejakovic.from.hr",
                    "icon": "globe",
                    "text": "Preview"
                },
                {
                    "url": "https://github.com/lpejakovic/portfolio-site",
                    "icon": "github",
                    "text": "GitHub"
                }
            ]
        },
        {
            "title": "Soundboard for kids",
            "subtitle": "C#, .NET MAUI, Android, iOS",
            "description": "Simple mobile app for small children: tap an animal picture to hear the sound it makes."
        },
        {
            "title": "Baby calculator",
            "subtitle": "Python, Flask, Gunicorn, HTML, CSS, JS",
            "description": "Simple website that takes a date of birth as input, calculates the difference and returns how many weeks the baby is old.",
            "links": [
                {
                    "url": "https://bc.luka-pejakovic.from.hr",
                    "icon": "globe",
                    "text": "Preview"
                },
                {
                    "url": "https://github.com/lpejakovic/baby-calculator",
                    "icon": "github",
                    "text": "GitHub"
                }
            ]
        },
        {
            "title": "BEBS.",
            "subtitle": "PHP, WordPress, Oxygen, SQLite",
            "description": "Blog website for my wife on WordPress, with a few custom features including a custom plugin for backups. It's simple and elegant, but the real magic is under the hood: all data is stored in SQLite instead of a dedicated database server.",
            "links": [
                {
                    "url": "https://bebs.com.hr",
                    "icon": "globe",
                    "text": "Preview"
                }
            ]
        }
    ]
};

function projectCardHTML(project) {
    const links = (project.links || []).map(link => `
                                <a href="${link.url}" target="_blank" rel="noopener" class="card-link">
                                    <svg class="icon" aria-hidden="true"><use href="#i-${link.icon}"></use></svg>
                                    <span>${link.text}</span>
                                </a>`).join('');

    return `
                    <div class="col-xl-4 col-lg-6">
                        <div class="card">
                            <div class="card-header bg-transparent">
                                <h5 class="card-title">${project.title}</h5>
                                <small class="text-muted">${project.subtitle}</small>
                            </div>
                            <div class="card-body">
                                <p class="card-text">${project.description}</p>
                            </div>
                            <div class="card-footer bg-transparent border-top-0">${links}
                            </div>
                        </div>
                    </div>`;
}

function projectsToHTML() {
    const sections = [
        { title: 'Professional', projects: projectListJson.professional },
        { title: 'Private', projects: projectListJson.private }
    ];

    document.getElementById('projects-container').innerHTML = sections.map(section => `
                <h3>${section.title}</h3>
                <div class="row">${section.projects.map(projectCardHTML).join('')}
                </div>`).join('');
}

document.addEventListener('DOMContentLoaded', projectsToHTML);
