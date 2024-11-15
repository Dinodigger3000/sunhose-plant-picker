import React, { useEffect, useState } from "react";
import styles from "../../styles/ProfileBuilderStyles/PriorityRanking.module.css";
import "../../styles/ProfileBuilderStyles/MainStyles.css";
import { setTheme } from "../ColorTheme";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const InfoBox = () => (
  <div className={styles.infoBox}>
    <div className="corner-dots">
      <div className="accent-dot" />
      <div className="accent-dot" />
    </div>
    <div className={styles.infoBoxContent}>
      <span className="question-number">Question 6</span>
      <h2 className="title">Priority Ranking</h2>
      <p className={styles.descriptionText}>
        Use the drag and drop feature to rank the factors most important to you
        in selecting the perfect plant for your space. These rankings will be
        used to calculate your plant match.
      </p>
    </div>
  </div>
);

const RankingSection = ({ profile, handleChange }) => {
  const [items, setItems] = useState(() => {
    const defaultItems = [
      { id: "light", content: "Light Level" },
      { id: "care", content: "Care Level" },
      { id: "budget", content: "Budget" },
      { id: "pets", content: "Pet Safety" },
      { id: "temp", content: "Temperature" },
    ];

    if (profile?.priorities?.length) {
      return profile.priorities.map(
        (priorityId) =>
          defaultItems.find((item) => item.id === priorityId) || defaultItems[0]
      );
    }

    return defaultItems;
  });

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedItems = Array.from(items);
    const [removed] = reorderedItems.splice(result.source.index, 1);
    reorderedItems.splice(result.destination.index, 0, removed);

    setItems(reorderedItems);

    if (handleChange) {
      handleChange({
        target: {
          name: "priorities",
          value: reorderedItems.map((item) => item.id),
        },
      });
    }
  };

  return (
    <div className={styles.rankingBox}>
      <p className={styles.rankingInstruction}>
        Drag and drop elements according to your ranking:
      </p>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable-list">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className={`${styles.rankingList} ${
                snapshot.isDraggingOver ? styles.draggingOver : ""
              }`}
            >
              {items.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`${styles.rankingItem} ${
                        snapshot.isDragging ? styles.dragging : ""
                      }`}
                    >
                      <div className={styles.rankNumber}>{index + 1}</div>
                      <div className={styles.rankContent}>{item.content}</div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};
const PriorityRanking = ({ profile, handleChange }) => {
  useEffect(() => {
    const baseColor = { r: 93, g: 53, b: 127 };
    setTheme(baseColor);
  }, []);

  return (
    <>
      <div className={styles.priorityHeader}>
        <InfoBox />
        <RankingSection profile={profile} handleChange={handleChange} />
      </div>
    </>
  );
};

export default PriorityRanking;
