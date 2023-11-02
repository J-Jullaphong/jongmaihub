import React, { useState, useEffect } from 'react';
import { Input, Button, Panel } from 'rsuite';
import DataSender from './DataSender';
import { useParams } from 'react-router-dom';

const StaffManagement = ({ staffData }) => {
    const [staff, setStaff] = useState(null);
    const [name, setName] = useState('');
    const [specialty, setSpecialty] = useState('');
    const [background, setBackground] = useState('');
    const [startWorkTime, setStartWorkTime] = useState('');
    const [getOffWorkTime, setGetOffWorkTime] = useState('');
    const [profilePicture, setProfilePicture] = useState('');
    const dataSender = new DataSender();
    const { staffUid } = useParams()

    useEffect(() => {
        const staffMember = staffData.find(staff => staff.uid === staffUid);
        if (staffMember) {
            setStaff(staffMember);
            setName(staffMember.name);
            setSpecialty(staffMember.specialty);
            setBackground(staffMember.background);
            setStartWorkTime(staffMember.start_work_time);
            setGetOffWorkTime(staffMember.get_off_work_time);
            setProfilePicture(staffMember.profile_picture);
        }
    }, [staffData, staffUid]);

    const updateStaffInfo = () => {
        const updatedStaffData = {
            name,
            specialty,
            background,
            startWorkTime,
            getOffWorkTime,
            profilePicture,
        };

        dataSender.updateStaffData(updatedStaffData, staff.uid).then(() => {
            console.log('Staff information updated.');
        });
    };

    return (
        <div>
            <Panel header={`Staff Management: ${staff ? staff.name : ''}`}>
                <h3>Staff Information:</h3>
                <Input
                    placeholder="Name"
                    value={name}
                    onChange={(value) => setName(value)}
                />
                <Input
                    placeholder="Specialty"
                    value={specialty}
                    onChange={(value) => setSpecialty(value)}
                />
                <Input
                    placeholder="Background"
                    value={background}
                    onChange={(value) => setBackground(value)}
                />
                <Input
                    placeholder="Start Work Time"
                    value={startWorkTime}
                    onChange={(value) => setStartWorkTime(value)}
                />
                <Input
                    placeholder="Get Off Work Time"
                    value={getOffWorkTime}
                    onChange={(value) => setGetOffWorkTime(value)}
                />
                <Input
                    placeholder="Profile Picture"
                    value={profilePicture}
                    onChange={(value) => setProfilePicture(value)}
                />
                <Button appearance="primary" onClick={updateStaffInfo}>
                    Update Staff Information
                </Button>
            </Panel>
        </div>
    );
};

export default StaffManagement;

