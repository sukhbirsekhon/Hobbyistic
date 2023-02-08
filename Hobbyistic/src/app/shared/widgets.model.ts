export interface Widgets {
    _id?:                 string;
    user?:                string;
    hobby?:               string;
    taskWidget?:          TaskWidget;
    notesWidget?:         NotesWidget;
    externalLinksWidget?: ExternalLinksWidget;
    calendarWidget?:      CalendarWidget;
    __v?:                 number;
}

export interface CalendarWidget {
    events?: Event[];
    _id?:    string;
}

export interface Event {
    title?:       string;
    description?: string;
    startDate?:   Date;
    endDate?:     Date;
    frequency?:   string;
    _id?:         string;
}

export interface ExternalLinksWidget {
    links?: Link[];
    _id?:   string;
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