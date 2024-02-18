describe('task', () => {
    it('base example task, visually looks correct', async () => {
        // APIs from jest-puppeteer
        await page.goto('http://localhost:9009/iframe.html?id=task-component--task-base-example&viewMode=story',
            {waitUntil: "networkidle2"});

        const image = await page.screenshot();

        // API from jest-image-snapshot
        expect(image).toMatchImageSnapshot();
    });
});