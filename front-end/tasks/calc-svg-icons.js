const fs = require('fs');
const glob = require('glob');

const SVG_FOLDER = 'assets/sprite/svg';
const OUTPUT_FILE = 'assets/scss/_svg-map.scss';

let result = '// GENERATE WITH calc-svg-icons TASK\n';
const iconNamesAndPaths = {};

glob(`${SVG_FOLDER}/**/*.svg`, (er, files) => {
	files.forEach((filePath) => {
		const fileNameSplit = filePath.split('/');
		const iconName = fileNameSplit[fileNameSplit.length - 1].replace(
			'.svg',
			'',
		);
		const duplicateIcon = iconNamesAndPaths[iconName];

		if (duplicateIcon) {
			// eslint-disable-next-line
			console.log(`${filePath} === icon name is same as ${duplicateIcon}! Sorry but duplicates are not allowed :/`);
			process.exit(1);
		}

		iconNamesAndPaths[iconName] = filePath;

		const data = fs.readFileSync(filePath, 'utf8');

		const searchAttr = 'viewBox="';
		const firstIndex = data.indexOf(searchAttr) + searchAttr.length;
		const lastIndex = data.indexOf('"', firstIndex);

		const attribute = data.substring(firstIndex, lastIndex);
		const attributeValues = attribute.split(' ');

		if (!attribute) {
			// eslint-disable-next-line
			console.log(`${filePath} === svg doesn't have a viewBox attribute :/`);
			process.exit(1);
		}
		result += `
.icon-${iconName} {
	width: ${Math.ceil(attributeValues[2])}px;
	height: ${Math.ceil(attributeValues[3])}px;
}
`;
	});

	fs.writeFileSync(OUTPUT_FILE, result, { encoding: 'utf8', flag: 'w' });
});