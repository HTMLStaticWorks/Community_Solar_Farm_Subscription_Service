const fs = require('fs');
const path = require('path');

const dir = 'c:\\Smart Fusion\\september\\Second _85_website\\Community Solar Farm Subscription Service';
const htmlFiles = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const publicPages = ['index.html', 'home-2.html', 'about.html', 'services.html', 'pricing.html', 'blog.html', 'contact.html'];
const dashboardPages = ['dashboard.html', 'orders.html', 'users.html', 'messages.html'];
const authUtilityPages = ['login.html', 'register.html', '404.html', 'coming-soon.html'];

for (const file of htmlFiles) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // 1. Add id="bootstrapCss" to Bootstrap link
    content = content.replace(
        /<link\s+(?:id="bootstrapCss"\s+)?href="https:\/\/cdn\.jsdelivr\.net\/npm\/bootstrap@5\.3\.3\/dist\/css\/bootstrap(?:\.rtl)?\.min\.css"\s+rel="stylesheet">/g,
        '<link id="bootstrapCss" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">'
    );

    // 2. Public pages: insert rtl-toggle before theme-toggle in .nav-actions
    if (publicPages.includes(file)) {
        if (!content.includes('rtl-toggle') && !content.includes('id="rtlToggle"')) {
            content = content.replace(
                /<div class="nav-actions">\s*<button class="theme-toggle"/g,
                `<div class="nav-actions">\n                        <button class="rtl-toggle" id="rtlToggle" title="Toggle RTL/LTR">\n                            <span class="rtl-text">RTL</span>\n                        </button>\n                        <button class="theme-toggle"`
            );
        }
    }

    // 3. Dashboard pages: insert rtl-toggle before theme-toggle in header
    if (dashboardPages.includes(file)) {
        if (!content.includes('rtl-toggle') && !content.includes('id="rtlToggle"')) {
            content = content.replace(
                /<button class="theme-toggle" id="themeToggle"/g,
                `<button class="rtl-toggle" id="rtlToggle" title="Toggle RTL/LTR">\n                            <span class="rtl-text">RTL</span>\n                        </button>\n                        <button class="theme-toggle" id="themeToggle"`
            );
        }
    }

    // 4. Auth/Utility pages: add top controls if not present
    if (authUtilityPages.includes(file)) {
        if (!content.includes('rtl-toggle') && !content.includes('id="rtlToggle"')) {
            const controls = `\n    <!-- Quick Top Controls (Theme & RTL) -->\n    <div class="position-fixed top-0 end-0 p-3 d-flex gap-2" style="z-index: 1050;">\n        <button class="rtl-toggle" id="rtlToggle" title="Toggle RTL/LTR">\n            <span class="rtl-text">RTL</span>\n        </button>\n        <button class="theme-toggle" id="themeToggle" title="Switch Theme">\n            <i class="bi bi-moon-fill"></i>\n        </button>\n    </div>\n`;
            content = content.replace(/<body([^>]*)>/, `<body$1>${controls}`);
        }
    }

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`RTL button configured in: ${file}`);
}
