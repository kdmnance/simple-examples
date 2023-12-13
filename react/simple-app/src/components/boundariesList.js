const BoundariesList = ({ items, selected, onSelectBoundary }) => (
  <ul className="boundaries">
    {items.map((boundary) => (
      <BoundaryItem
        boundary={boundary}
        selected={selected}
        onSelectBoundary={onSelectBoundary}
        key={boundary.id}
      />
    ))}
  </ul>
);

const BoundaryItem = ({ boundary, selected, onSelectBoundary }) => (
  <li
    className={selected && selected.name === boundary.name ? "boundary selected" : "boundary"}
    onClick={() => onSelectBoundary(boundary)}
  >
    {boundary.name}
  </li>
);

export default BoundariesList;
