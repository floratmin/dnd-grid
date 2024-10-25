import logo from './logo.svg';
import styles from './App.module.css';
import {SortableVerticalListExample} from './div';
import {SortableTableExample} from './table';
import {SortableTableGridExample} from './table-grid';
import {SortableTableGridNoGridTemplateColumnsExample} from './table-grid-no-grid-template-columns';


function App() {
    return (
        <div className={styles.App}>
            <p>Div</p>
            <SortableVerticalListExample/>
            <p>Table</p>
            <SortableTableExample/>
            <p>Grid without <code>display: contents</code> and without <code>grid-template-columns</code></p>
            <SortableTableGridNoGridTemplateColumnsExample/>
            <p>Grid with <code>display: contents</code> and with <code>grid-template-columns</code></p>
            <SortableTableGridExample/>
        </div>
    );
}

export default App;
