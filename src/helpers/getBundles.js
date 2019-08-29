const getBundles = (manifest, chunks) => {
    if (!manifest || !chunks) {
        return {};
    }

    return chunks.reduce(function (bundle, asset) {
        Object.keys(manifest.assets[asset]).forEach(e => {
            const content = manifest.assets[asset][e];

            if (!bundle[e]) {
                bundle[e] = [];
            }
            bundle[e] = [...bundle[e], ...content].filter((elem, pos, arr) => arr.indexOf(elem) === pos)
        });
        return bundle;
    }, {});
};

export { getBundles }
