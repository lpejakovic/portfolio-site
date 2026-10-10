const projectListJson = {
    "professional": [
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
            "title": "4D Wand IMC - mobile application",
            "subtitle": "C#, Xamarin.Forms, SQLite, Android, iOS",
            "description": "Cross-platform mobile application that allows users to manage commercial and warehouse documents, analyze financial data and access detailed product information.",
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
        },
        {
            "title": "4D Loyalty",
            "subtitle": "C#, .NET MAUI, SQLite, Android, iOS",
            "description": "4D Loyalty is a cross-platform mobile application that allows user to store and access loyalty program cards or any other barcode inputs.",
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
            "title": "WebSocket Service",
            "subtitle": "C#, .NET 8, Websocket.Client",
            "description": "Minimal API web service that translates a REST request to Websocket message and communicates to predefined endpoints."
        }
    ],
    "private": [
        {
            "title": "Personal portfolio page",
            "subtitle": "HTML, CSS, JS",
            "description": "Simple single-page website, that demonstrates basic skills of frontend website development.",
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
            "description": "Created a blog website for my wife on a WordPress platform, with a few custom functionalities. It's pretty simple and elegant, but the real magic is behind the hood where all data is stored on SQLite, instead of dedicated RDBMS.",
            "links": [
                {
                    "url": "http://blog.luka-pejakovic.from.hr",
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
