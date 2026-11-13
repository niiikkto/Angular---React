import StudentCard from './StudentCard';

function StudentList({ students }) {
    if (students.length === 0) {
        return (
            <p style={{ textAlign: 'center', color: '#888', padding: '40px 0' }}>
                Студентов пока нет 😔
            </p>
        );
    }

    return (
        <div
            style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                gap: '16px',
            }}
        >
            {students.map((student) => (
                <StudentCard key={student.id} student={student} />
            ))}
        </div>
    );
}

export default StudentList;