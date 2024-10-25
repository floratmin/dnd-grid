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
                contents: true,
            }}
        >
            <td class="sortable">{'value ' + props.item}</td>
            <td class="sortable"><input type="text" value={props.item}/></td>
            <td class="sortable">{'value ' + props.item}</td>
        </tr>
    );
};

export const SortableTableGridExample = () => {
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
            <table class="column self-stretch table table-grid">
                <thead class="contents">
                <tr class="sortable contents">
                    <th class="sortable" scope="col">one</th>
                    <th class="sortable" scope="col">two</th>
                    <th class="sortable" scope="col">three</th>
                </tr>
                </thead>
                <tbody class="contents">
                <SortableProvider ids={ids()}>
                    <For each={items()}>{(item) => <Sortable item={item}/>}</For>
                </SortableProvider>
                </tbody>
            </table>
            <DragOverlay>
                <table class="column self-stretch table table-grid">
                    <tbody class="contents">
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