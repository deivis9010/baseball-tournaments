# Accessibility standard

Applies from H3. Target: WCAG 2.2 level AA. Most use happens on a phone, outdoors, at the field.

- Use semantic HTML and react-bootstrap components before custom ones: buttons are `<button>`, links are `<a>`.
- Every input has a visible label. Errors are shown next to the field, in text, not only in color.
- Text contrast at least 4.5:1 (3:1 for large text). Check it in light sunlight conditions: prefer strong contrast.
- Touch targets at least 44 × 44 px; enough spacing between actions in score capture.
- Everything works with the keyboard and shows a visible focus.
- Images have `alt`; decorative ones have `alt=""`.
- Tables (standings, box scores) use `<th>` with `scope` and a caption.
- Do not rely on hover. Do not disable zoom.
- The `lang` attribute follows the selected language (`es` or `en`).
- Component tests query by role and label (`getByRole`, `getByLabelText`), which also checks accessibility.
