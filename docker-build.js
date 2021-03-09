const { spawn } = require("child_process");
const { promises } = require("fs");
const { readFile } = promises;

function run(executable, args) {
    console.log([executable, ...args].join(' '))
    return (new Promise((resolve, reject) => {
        let childProcess = spawn(executable, args, {
            stdio: [
                "inherit", // StdIn.
                "inherit",    // StdOut.
                "inherit",    // StdErr.
            ],
        });
        childProcess.on("close", (code) => {
            if (code !== 0) {
                reject(new Error(`The command '${executable}', exited with the unsuccessful statuscode '${code}'.`));
            }
            resolve(undefined);
        });
    }));
}

async function main() {
    let service;
    let tagLatest = false;
    let registry;
    let organization = "rudx-lenra-test";
    for (let i = 1; i < process.argv.length; i++) {
        switch (process.argv[i]) {
            case '--service':
                service = process.argv[++i];
                break
            case '--organization':
                organization = process.argv[++i];
                break
            case '--tagLatest':
                tagLatest = true;
                break
            case '--registry':
                registry = process.argv[++i];
                break
            case '--help':
                console.log(
                    `options:\n` +
                    '\t--service <name> [required] Name of the service to build the image for\n' +
                    '\t--organization <name> Name of the organization fot the image\n' +
                    '\t--tagLatest should the image also be tagged as latest\n' +
                    '\t--registry <url> optional docker registry\n' +
                    '\t--help show help\n'
                );
                process.exit(1);
                break
        }
    }
    const lernaJson = (await readFile("package.json")).toString();
    const version = JSON.parse(lernaJson).version;
    const buildTag = `${registry ? registry + '/' : ''}${organization}/${service}:${version}`;
    await run("docker", ["build", "-t", buildTag, "../.."]);
    await run("docker", ["push", buildTag]);
    if (tagLatest) {
        const latestTag = `${registry ? registry + '/' : ''}${organization}:latest`;
        await run("docker", ["tag", buildTag, latestTag]);
        await run("docker", ["push", latestTag]);
    }
}

main().catch(err => {
    console.error(err);
    process.exit(1);
});
