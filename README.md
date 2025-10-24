# components

<details>
  <summary><h3>Dropdown</h3></summary>

  ```tsx
  const Home = () => {
    const listMap = [
      { label: 'option 1', onClick: () => console.log('option 1') },
      { label: 'option 2', onClick: () => console.log('option 2') },
      { label: 'option 3', onClick: () => console.log('option 3') },
    ];
  
    return (
      <Dropdown>
        <Dropdown.trigger className='border-1 border-black'>select</Dropdown.trigger>
        <Dropdown.list className='absolute w-25 border-1 border-black'>
          {listMap.map(({ label, onClick }, index) => (
            <Dropdown.item key={index} onClick={onClick}>
              {label}
            </Dropdown.item>
          ))}
        </Dropdown.list>
      </Dropdown>
    );
  }
  ```
</details>

