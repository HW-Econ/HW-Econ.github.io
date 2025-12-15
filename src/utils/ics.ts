export function generateICS(event: {
    title: string;
    description: string;
    location?: string;
    start: Date;
    end: Date;
    url?: string;
}): string {
    const formatDate = (date: Date) => {
        return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    };

    const lines = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//ECESS//Seminar Series//EN',
        'BEGIN:VEVENT',
        `UID:${Date.now()}@ecess.hw.ac.uk`,
        `DTSTAMP:${formatDate(new Date())}`,
        `DTSTART:${formatDate(event.start)}`,
        `DTEND:${formatDate(event.end)}`,
        `SUMMARY:${event.title}`,
        `DESCRIPTION:${event.description}`,
        event.location ? `LOCATION:${event.location}` : '',
        event.url ? `URL:${event.url}` : '',
        'END:VEVENT',
        'END:VCALENDAR',
    ];

    return lines.filter(Boolean).join('\r\n');
}
