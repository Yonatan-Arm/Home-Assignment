/* eslint-disable react/prop-types */

export default function SelectedItem({ selectedItem, closeModal }) {
  return (
    <section className="item-section" onClick={closeModal}>
      <button onClick={closeModal}>X</button>
      <div className="item-modal">
        <div className="img-section">
          <img src={selectedItem.largeImageURL} alt="item-img" />
        </div>
        <div className="description">
          <span>likes:{selectedItem?.likes}</span>
          <span>downloads:{selectedItem.downloads}</span>
          <span>comments:{selectedItem.comments}</span>
          <span>collections:{selectedItem.collections}</span>
          <span>views:{selectedItem.views}</span>
        </div>
      </div>
    </section>
  );
}
