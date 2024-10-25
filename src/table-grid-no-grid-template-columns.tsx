import {Draggable, useDragDropContext} from "@thisbeyond/solid-dnd";
import {
    DragDropProvider,
    DragDropSensors,
    DragOverlay,
    SortableProvider,
    createSortable,
    closestCenter,
} from "@thisbeyond/solid-dnd";
import {createSignal, For} from "solid-js";

const Sortable = (props: { item: number | string }) => {
    const sortable = createSortable(props.item);
    const [state] = useDragDropContext();
    return (
        <tr
            use:sortable
            classList={{
                "opacity-25": sortable.isActiveDraggable,
                "transition-transform": !!state.active.draggable,
                sortable: true,
            }}
        >
            <td>{'value ' + props.item}</td>
            <td><input type="text" value={props.item}/></td>
            <td>{'value ' + props.item}</td>
        </tr>
    );
};

export const SortableTableGridNoGridTemplateColumnsExample = () => {
    const [items, setItems] = createSignal([1, 2, 3]);
    const [activeItem, setActiveItem] = createSignal<number | string>(null);
    const ids = () => items();

    const onDragStart = ({draggable}: { draggable: Draggable }) => setActiveItem(draggable.id);

    const onDragEnd = ({draggable, droppable}) => {
        if (draggable && droppable) {
            const currentItems = ids();
            const fromIndex = currentItems.indexOf(draggable.id);
            const toIndex = currentItems.indexOf(droppable.id);
            if (fromIndex !== toIndex) {
                const updatedItems = currentItems.slice();
                updatedItems.splice(toIndex, 0, ...updatedItems.splice(fromIndex, 1));
                setItems(updatedItems);
            }
        }
    };

    return (
        <DragDropProvider
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            collisionDetector={closestCenter}
        >
            <DragDropSensors/>
            <table class="column self-stretch table table-grid-no-grid-template-columns">
                <thead class="contents">
                <tr class="sortable">
                    <th scope="col">one</th>
                    <th scope="col">two</th>
                    <th scope="col">three</th>
                </tr>
                </thead>
                <tbody class="contents">
                <SortableProvider ids={ids()}>
                    <For each={items()}>{(item) => <Sortable item={item}/>}</For>
                </SortableProvider>
                </tbody>
            </table>
            <DragOverlay>
                <table class="column self-stretch table-grid">
                    <tbody>
                    <tr class="sortable">
                        <td>{'value ' + activeItem()}</td>
                        <td><input type="text" value={activeItem()}/></td>
                        <td>{'value ' + activeItem()}</td>
                    </tr>
                    </tbody>
                </table>
            </DragOverlay>
        </DragDropProvider>
    );
};