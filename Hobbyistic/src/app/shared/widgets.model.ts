export interface Widgets {
    _id?:                 string;
    user?:                string;
    hobby?:               string;
    taskWidget?:          TaskWidget;
    notesWidget?:         NotesWidget;
    externalLinksWidget?: ExternalLinksWidget;
    __v?:                 number;
}

export interface ExternalLinksWidget {
    _id?:   string;
    links?: Link[];
}

export interface Link {
    title?:   string;
    link?:    string;
    snippet?: string;
    _id?:     string;
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