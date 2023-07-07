import compression from "compression"
import gzipStatic from "connect-gzip-static"

export const server = (done) => {
    const options = {
        server: {
            baseDir: `${app.path.build.html}`,
            // middleware: compression(),
            // middleware: app.isBuild ? [compression()] : [],
            // middleware: [compression(), gzipStatic(`${app.path.build.html}`)],
        },
        notify: false,
        snippet: app.isBrowsersync,
        port: 3000,
        open: false,
        // files: ["**.*", "dist/css/*.css"],
    }
    if (app.isGzip) {
        options.server.middleware = [
            {
                route: "", // empty 'route' will apply this to all paths
                handle: gzipStatic(`${app.path.build.html}`), // the callable
                override: true,
            },
            compression(),
        ]
    }
    app.plugins.browsersync.init(
        options
        // function (err, bs) {
        //    bs.addMiddleware("*", gzipStatic("dist/"), {
        //       override: true,
        //    })
        // }
    )
}
