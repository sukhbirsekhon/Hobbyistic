export interface Widgets {
    _id:         string;
    user?:        string;
    hobby?:       string;
    taskWidget?:  TaskWidget;
    notesWidget?: NotesWidget;
    __v?:         number;
}

export interface NotesWidget {
    note?: string;
    _id?:  string;
}

export interface TaskWidget {
    tasks?: Task[];
    _id?:   string;
}

export interface Task {
    task?:      string;
    completed?: boolean;
    _id?:       string;
}