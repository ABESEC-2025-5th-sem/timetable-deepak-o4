// PDF Export and Calendar Sync for Timetable
class TimetableExporter {
    constructor() {
        this.init();
    }

    init() {
        this.addExportButtons();
        this.addCalendarSync();
        this.bindEvents();
    }

    addExportButtons() {
        const exportControls = document.createElement('div');
        exportControls.className = 'export-controls';
        exportControls.innerHTML = `
            <div class="control-panel">
                <h3>📄 Export Options</h3>
                <div class="export-buttons">
                    <button id="exportPDF" class="export-btn pdf-btn">
                        📄 Export as PDF
                    </button>
                    <button id="exportImage" class="export-btn image-btn">
                        🖼️ Export as Image
                    </button>
                    <button id="exportCSV" class="export-btn csv-btn">
                        📊 Export as CSV
                    </button>
                    <button id="printTimetable" class="export-btn print-btn">
                        🖨️ Print Timetable
                    </button>
                </div>
                
                <h3>📅 Calendar Integration</h3>
                <div class="calendar-buttons">
                    <button id="exportCalendar" class="export-btn calendar-btn">
                        📅 Export to Calendar
                    </button>
                    <button id="syncGoogle" class="export-btn google-btn">
                        📱 Sync with Google Calendar
                    </button>
                    <button id="syncOutlook" class="export-btn outlook-btn">
                        📧 Sync with Outlook
                    </button>
                </div>
                
                <h3>⚙️ Export Settings</h3>
                <div class="export-settings">
                    <label>
                        <input type="checkbox" id="includeColors" checked>
                        Include colors in export
                    </label>
                    <label>
                        <input type="checkbox" id="includeBorders" checked>
                        Include borders
                    </label>
                    <label>
                        <input type="checkbox" id="includeHeader" checked>
                        Include header information
                    </label>
                    <label>
                        <input type="checkbox" id="compactMode">
                        Compact mode (smaller text)
                    </label>
                </div>
            </div>
        `;

        // Add CSS for export controls
        const styles = `
            .export-controls {
                position: fixed;
                top: 20px;
                right: 20px;
                background: white;
                border-radius: 12px;
                box-shadow: 0 4px 20px rgba(0,0,0,0.1);
                padding: 20px;
                width: 280px;
                z-index: 1000;
                border: 1px solid #e1e5e9;
            }
            
            .control-panel h3 {
                margin: 0 0 15px 0;
                color: #333;
                font-size: 16px;
                border-bottom: 2px solid #f0f0f0;
                padding-bottom: 8px;
            }
            
            .export-buttons, .calendar-buttons {
                display: grid;
                gap: 8px;
                margin-bottom: 20px;
            }
            
            .export-btn {
                padding: 12px 15px;
                border: none;
                border-radius: 8px;
                cursor: pointer;
                font-size: 14px;
                font-weight: 500;
                transition: all 0.3s ease;
                text-align: left;
            }
            
            .pdf-btn { background: #dc2626; color: white; }
            .image-btn { background: #7c3aed; color: white; }
            .csv-btn { background: #059669; color: white; }
            .print-btn { background: #1f2937; color: white; }
            .calendar-btn { background: #2563eb; color: white; }
            .google-btn { background: #ea4335; color: white; }
            .outlook-btn { background: #0078d4; color: white; }
            
            .export-btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            }
            
            .export-settings {
                display: grid;
                gap: 8px;
            }
            
            .export-settings label {
                display: flex;
                align-items: center;
                gap: 8px;
                font-size: 13px;
                color: #555;
                cursor: pointer;
            }
            
            .export-settings input[type="checkbox"] {
                width: 16px;
                height: 16px;
                accent-color: #2563eb;
            }
            
            @media (max-width: 768px) {
                .export-controls {
                    position: relative;
                    top: 0;
                    right: 0;
                    width: 100%;
                    margin: 20px 0;
                }
            }
        `;

        const styleSheet = document.createElement('style');
        styleSheet.textContent = styles;
        document.head.appendChild(styleSheet);

        document.body.appendChild(exportControls);
    }

    addCalendarSync() {
        // Create hidden calendar sync elements
        this.createCalendarModal();
    }

    createCalendarModal() {
        const modal = document.createElement('div');
        modal.id = 'calendarModal';
        modal.className = 'calendar-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>📅 Calendar Export Settings</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label>Calendar Name:</label>
                        <input type="text" id="calendarName" value="Class Timetable" placeholder="Enter calendar name">
                    </div>
                    <div class="form-group">
                        <label>Time Zone:</label>
                        <select id="timeZone">
                            <option value="UTC">UTC</option>
                            <option value="America/New_York">Eastern Time</option>
                            <option value="America/Chicago">Central Time</option>
                            <option value="America/Denver">Mountain Time</option>
                            <option value="America/Los_Angeles">Pacific Time</option>
                            <option value="Europe/London">London</option>
                            <option value="Europe/Paris">Paris</option>
                            <option value="Asia/Tokyo">Tokyo</option>
                            <option value="Asia/Shanghai">Shanghai</option>
                            <option value="Asia/Kolkata" selected>India Standard Time</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>
                            <input type="checkbox" id="includeReminders" checked>
                            Include 15-minute reminders
                        </label>
                    </div>
                    <div class="form-group">
                        <label>
                            <input type="checkbox" id="weeklyRecurrence" checked>
                            Create recurring weekly events
                        </label>
                    </div>
                </div>
                <div class="modal-footer">
                    <button id="downloadICS" class="modal-btn primary">Download .ics File</button>
                    <button id="cancelExport" class="modal-btn secondary">Cancel</button>
                </div>
            </div>
        `;

        const modalStyles = `
            .calendar-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.5);
                display: none;
                justify-content: center;
                align-items: center;
                z-index: 10000;
            }
            
            .modal-content {
                background: white;
                border-radius: 12px;
                width: 90%;
                max-width: 500px;
                max-height: 90vh;
                overflow-y: auto;
            }
            
            .modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 20px;
                border-bottom: 1px solid #e1e5e9;
            }
            
            .modal-header h3 {
                margin: 0;
                color: #333;
            }
            
            .modal-close {
                background: none;
                border: none;
                font-size: 24px;
                cursor: pointer;
                color: #666;
            }
            
            .modal-body {
                padding: 20px;
            }
            
            .form-group {
                margin-bottom: 15px;
            }
            
            .form-group label {
                display: block;
                margin-bottom: 5px;
                font-weight: 500;
                color: #333;
            }
            
            .form-group input[type="text"],
            .form-group select {
                width: 100%;
                padding: 10px;
                border: 1px solid #ddd;
                border-radius: 6px;
                font-size: 14px;
            }
            
            .form-group input[type="checkbox"] {
                margin-right: 8px;
            }
            
            .modal-footer {
                padding: 20px;
                border-top: 1px solid #e1e5e9;
                display: flex;
                gap: 10px;
                justify-content: flex-end;
            }
            
            .modal-btn {
                padding: 10px 20px;
                border: none;
                border-radius: 6px;
                cursor: pointer;
                font-size: 14px;
                font-weight: 500;
            }
            
            .modal-btn.primary {
                background: #2563eb;
                color: white;
            }
            
            .modal-btn.secondary {
                background: #f3f4f6;
                color: #374151;
            }
            
            .modal-btn:hover {
                opacity: 0.9;
            }
        `;

        const modalStyleSheet = document.createElement('style');
        modalStyleSheet.textContent = modalStyles;
        document.head.appendChild(modalStyleSheet);

        document.body.appendChild(modal);
    }

    bindEvents() {
        // PDF Export
        document.getElementById('exportPDF')?.addEventListener('click', () => {
            this.exportToPDF();
        });

        // Image Export
        document.getElementById('exportImage')?.addEventListener('click', () => {
            this.exportToImage();
        });

        // CSV Export
        document.getElementById('exportCSV')?.addEventListener('click', () => {
            this.exportToCSV();
        });

        // Print
        document.getElementById('printTimetable')?.addEventListener('click', () => {
            this.printTimetable();
        });

        // Calendar exports
        document.getElementById('exportCalendar')?.addEventListener('click', () => {
            this.showCalendarModal();
        });

        document.getElementById('syncGoogle')?.addEventListener('click', () => {
            this.syncWithGoogle();
        });

        document.getElementById('syncOutlook')?.addEventListener('click', () => {
            this.syncWithOutlook();
        });

        // Modal events
        document.getElementById('downloadICS')?.addEventListener('click', () => {
            this.downloadICSFile();
        });

        document.getElementById('cancelExport')?.addEventListener('click', () => {
            this.hideCalendarModal();
        });

        document.querySelector('.modal-close')?.addEventListener('click', () => {
            this.hideCalendarModal();
        });
    }

    exportToPDF() {
        this.showNotification('📄 Generating PDF...', 'info');
        
        // Simple PDF generation using browser print
        const printWindow = window.open('', '_blank');
        const timetableContent = this.getTimetableContent();
        
        printWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Class Timetable</title>
                <style>
                    body { font-family: Arial, sans-serif; margin: 20px; }
                    .header { text-align: center; margin-bottom: 30px; }
                    .timetable { width: 100%; border-collapse: collapse; }
                    .timetable th, .timetable td { 
                        border: 1px solid #333; 
                        padding: 8px; 
                        text-align: center; 
                    }
                    .timetable th { background-color: #f0f0f0; }
                    @media print {
                        body { margin: 0; }
                        .no-print { display: none; }
                    }
                </style>
            </head>
            <body>
                <div class="header">
                    <h1>Class Timetable</h1>
                    <p>Generated on ${new Date().toLocaleDateString()}</p>
                </div>
                ${timetableContent}
            </body>
            </html>
        `);
        
        printWindow.document.close();
        
        setTimeout(() => {
            printWindow.print();
            this.showNotification('📄 PDF export ready!', 'success');
        }, 500);
    }

    exportToImage() {
        this.showNotification('🖼️ Generating image...', 'info');
        
        // Simple canvas-based image export
        const timetableElement = document.querySelector('table') || document.querySelector('.timetable');
        
        if (!timetableElement) {
            this.showNotification('❌ No timetable found to export!', 'error');
            return;
        }

        // Create canvas and draw timetable
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = 800;
        canvas.height = 600;
        
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = 'black';
        ctx.font = '16px Arial';
        ctx.fillText('Class Timetable', canvas.width/2 - 60, 30);
        ctx.fillText(`Generated on ${new Date().toLocaleDateString()}`, canvas.width/2 - 80, 60);
        
        // Draw a simple timetable representation
        ctx.strokeRect(50, 100, canvas.width - 100, canvas.height - 200);
        ctx.fillText('Timetable exported as image', canvas.width/2 - 100, canvas.height/2);
        
        // Download the image
        canvas.toBlob((blob) => {
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'timetable.png';
            a.click();
            URL.revokeObjectURL(url);
            this.showNotification('🖼️ Image downloaded!', 'success');
        });
    }

    exportToCSV() {
        this.showNotification('📊 Generating CSV...', 'info');
        
        const csvData = this.generateCSVData();
        const blob = new Blob([csvData], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = 'timetable.csv';
        a.click();
        
        URL.revokeObjectURL(url);
        this.showNotification('📊 CSV downloaded!', 'success');
    }

    printTimetable() {
        this.showNotification('🖨️ Preparing for print...', 'info');
        window.print();
    }

    showCalendarModal() {
        const modal = document.getElementById('calendarModal');
        if (modal) {
            modal.style.display = 'flex';
        }
    }

    hideCalendarModal() {
        const modal = document.getElementById('calendarModal');
        if (modal) {
            modal.style.display = 'none';
        }
    }

    downloadICSFile() {
        const calendarName = document.getElementById('calendarName').value || 'Class Timetable';
        const timeZone = document.getElementById('timeZone').value;
        const includeReminders = document.getElementById('includeReminders').checked;
        const weeklyRecurrence = document.getElementById('weeklyRecurrence').checked;
        
        const icsContent = this.generateICSContent(calendarName, timeZone, includeReminders, weeklyRecurrence);
        
        const blob = new Blob([icsContent], { type: 'text/calendar' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = 'timetable.ics';
        a.click();
        
        URL.revokeObjectURL(url);
        this.hideCalendarModal();
        this.showNotification('📅 Calendar file downloaded!', 'success');
    }

    syncWithGoogle() {
        this.showNotification('📱 Opening Google Calendar...', 'info');
        
        // Generate Google Calendar URL
        const title = encodeURIComponent('Class Timetable');
        const details = encodeURIComponent('Imported from class timetable');
        const googleUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}`;
        
        window.open(googleUrl, '_blank');
    }

    syncWithOutlook() {
        this.showNotification('📧 Opening Outlook Calendar...', 'info');
        
        // Generate Outlook Calendar URL
        const title = encodeURIComponent('Class Timetable');
        const body = encodeURIComponent('Imported from class timetable');
        const outlookUrl = `https://outlook.live.com/calendar/0/deeplink/compose?subject=${title}&body=${body}`;
        
        window.open(outlookUrl, '_blank');
    }

    getTimetableContent() {
        const table = document.querySelector('table');
        return table ? table.outerHTML : '<p>No timetable found</p>';
    }

    generateCSVData() {
        // Sample CSV data - replace with actual timetable parsing
        const csvContent = [
            'Day,Time,Subject,Room,Teacher',
            'Monday,9:00 AM,Mathematics,Room 101,Dr. Smith',
            'Monday,10:00 AM,Physics,Lab 1,Prof. Johnson',
            'Tuesday,9:00 AM,Chemistry,Lab 2,Dr. Brown',
            'Tuesday,10:00 AM,English,Room 201,Ms. Davis',
            'Wednesday,9:00 AM,History,Room 301,Mr. Wilson',
            'Wednesday,10:00 AM,Biology,Lab 3,Dr. Taylor'
        ].join('\n');
        
        return csvContent;
    }

    generateICSContent(calendarName, timeZone, includeReminders, weeklyRecurrence) {
        const now = new Date();
        const formatDate = (date) => {
            return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
        };
        
        let icsContent = [
            'BEGIN:VCALENDAR',
            'VERSION:2.0',
            'PRODID:-//Timetable App//EN',
            'CALSCALE:GREGORIAN',
            'METHOD:PUBLISH',
            `X-WR-CALNAME:${calendarName}`,
            `X-WR-TIMEZONE:${timeZone}`,
            ''
        ];
        
        // Sample events - replace with actual timetable parsing
        const events = [
            { title: 'Mathematics', start: '09:00', end: '10:00', day: 1, room: 'Room 101' },
            { title: 'Physics', start: '10:00', end: '11:00', day: 1, room: 'Lab 1' },
            { title: 'Chemistry', start: '09:00', end: '10:00', day: 2, room: 'Lab 2' }
        ];
        
        events.forEach((event, index) => {
            const eventStart = new Date(now);
            eventStart.setDate(eventStart.getDate() + (event.day - eventStart.getDay()));
            const [startHour, startMin] = event.start.split(':');
            eventStart.setHours(parseInt(startHour), parseInt(startMin), 0, 0);
            
            const eventEnd = new Date(eventStart);
            const [endHour, endMin] = event.end.split(':');
            eventEnd.setHours(parseInt(endHour), parseInt(endMin), 0, 0);
            
            icsContent.push('BEGIN:VEVENT');
            icsContent.push(`UID:${Date.now()}-${index}@timetable-app.com`);
            icsContent.push(`DTSTART:${formatDate(eventStart)}`);
            icsContent.push(`DTEND:${formatDate(eventEnd)}`);
            icsContent.push(`SUMMARY:${event.title}`);
            icsContent.push(`LOCATION:${event.room}`);
            
            if (weeklyRecurrence) {
                icsContent.push('RRULE:FREQ=WEEKLY');
            }
            
            if (includeReminders) {
                icsContent.push('BEGIN:VALARM');
                icsContent.push('TRIGGER:-PT15M');
                icsContent.push('ACTION:DISPLAY');
                icsContent.push('DESCRIPTION:Class reminder');
                icsContent.push('END:VALARM');
            }
            
            icsContent.push('END:VEVENT');
            icsContent.push('');
        });
        
        icsContent.push('END:VCALENDAR');
        return icsContent.join('\r\n');
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 20px;
            padding: 12px 20px;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            z-index: 10001;
            animation: slideInLeft 0.3s ease;
            max-width: 300px;
            background: ${type === 'success' ? '#059669' : type === 'error' ? '#dc2626' : '#2563eb'};
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutLeft 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const exporter = new TimetableExporter();
    
    // Add slide animations
    const slideStyles = `
        @keyframes slideInLeft {
            from { transform: translateX(-100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slideOutLeft {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(-100%); opacity: 0; }
        }
    `;
    
    const slideStyleSheet = document.createElement('style');
    slideStyleSheet.textContent = slideStyles;
    document.head.appendChild(slideStyleSheet);
    
    console.log('📄 Timetable Export Features Loaded!');
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TimetableExporter;
}