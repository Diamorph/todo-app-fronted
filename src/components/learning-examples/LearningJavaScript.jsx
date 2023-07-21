const person = {
    name: 'Vladyslav',
    address: {
        line1: '1234 Baker Street',
        city: 'Charlotte',
        state: 'NC',
        country: 'USA'
    },
    profiles: ['twitter', 'instagram', 'linkedin'],
    printProfile: () => {
        person.profiles.map((p) => console.log(p));
    }
};

export default function LearningJavaScript() {
    return (
        <div className="person">
            <div>{person.name}</div>
            <div>{person.address.line1}</div>
            <div>{person.address.city}</div>
            <div>{person.address.state}</div>
            <div>{person.address.country}</div>
            <div>{person.profiles[0]}</div>
            <div>{person.profiles[1]}</div>
            <div>{person.profiles[2]}</div>
            <div>{person.printProfile()}</div>
        </div>
    );
}
