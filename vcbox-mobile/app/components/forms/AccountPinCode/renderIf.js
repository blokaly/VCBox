export default function renderIf(condition, content, contentElse) {
    if (condition) {
        return content;
    } else {
        return typeof contentElse != 'undefined' ? contentElse : null;
    }
}