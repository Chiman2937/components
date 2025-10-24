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

<details>
  <summary><h3>Tabs</h3></summary>

  ```tsx
  const Home = () => {
    const [selectedValue, setSelectedValue] = useState('created');

    const listMap = [
      { value: 'created', children: '등록한 상품' },
      { value: 'favorite', children: '찜한 상품' },
      { value: 'reviewed', children: '리뷰 남긴 상품' },
    ];
  
    return (
      <Tabs value={selectedValue} onValueChange={setSelectedValue}>
        <Tabs.list className='flex w-fit flex-row gap-5 border-1'>
          {listMap.map(({ value, children }) => (
            <Tabs.item
              key={value}
              className='w-30 border-black data-[state=active]:border-b-1'
              value={value}
            >
              {children}
            </Tabs.item>
          ))}
        </Tabs.list>
      </Tabs>
    );
  }
  ```
</details>


<details>
  <summary><h3>Select</h3></summary>

  ```tsx
  const Home = () => {
    const [selectedValue, setSelectedValue] = useState('created');
  
    const listMap = [
      { value: 'created', children: '최신순' },
      { value: 'favorite', children: '좋아요순' },
      { value: 'suggest', children: '추천순' },
    ];
  
    return (
      <Select value={selectedValue} onValueChange={setSelectedValue}>
        <Select.trigger>
          <Select.value />
        </Select.trigger>
        <Select.list>
          {listMap.map(({ value, children }) => (
            <Select.item key={value} value={value}>
              {children}
            </Select.item>
          ))}
        </Select.list>
      </Select>
    );
  };
  ```
</details>
