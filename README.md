## components
<details>
  <summary><h4>FormField</h4></summary>

```tsx
'use client';

import { FormProvider, useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import {
  FormCheckbox,
  FormCheckboxGroup,
  FormCheckboxItem,
} from '@/components/FormField/FormCheckbox';
import { FormControl } from '@/components/FormField/FormControl';
import FormDatePicker from '@/components/FormField/FormDatePicker';
import FormField from '@/components/FormField/FormField';
import FormHint from '@/components/FormField/FormHint';
import FormImageUpload from '@/components/FormField/FormImageUpload';
import FormInput from '@/components/FormField/FormInput';
import FormLabel from '@/components/FormField/FormLabel';
import { FormRadio, FormRadioGroup } from '@/components/FormField/FormRadio';
import FormSelect from '@/components/FormField/FormSelect';
import FormTextArea from '@/components/FormField/FormTextArea';
const schema = z.object({
  email: z.email('올바른 이메일 형식을 입력하세요.'),
  password: z.string().min(1, '한글자 이상 입력 필요').max(10, '열글자 이하 입력 필요'),
  plan: z.preprocess((val) => val ?? '', z.string().min(1, '요금제를 선택 해주세요')),
  description: z.string().min(10, '10자 이상 입력 필요'),
  interests: z.array(z.string()).min(0, ''),
  agreement: z.boolean().refine((val) => val === true, {
    message: '동의가 필요합니다',
  }),
  images: z
    .record(z.string(), z.instanceof(File).nullable())
    .refine((images) => Object.keys(images).length >= 1, {
      message: '최소 1개 이상의 이미지를 업로드해주세요',
    }),
  repeat: z.string().min(1, '반복 횟수를 설정해주세요'),
  date: z.date("날짜를 선택해주세요")
});

const Home = () => {
  const methods = useForm({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
      plan: 'pro',
      description: '',
      interests: [],
      agreement: false,
      images: {},
      repeat: '',
      date: undefined
    },
  });

  const onSubmit = (data: z.infer<typeof schema>) => {
    console.log(data);
  };

  return (
    <div className='ml-100'>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>

          <FormField name='email'>
            <FormLabel required>이메일</FormLabel>
            <FormInput placeholder='email@example.com' type='email' />
            <FormHint />
          </FormField>

          <FormField name='password'>
            <FormLabel required>비밀번호</FormLabel>
            <FormInput placeholder='password' type='password' />
            <FormHint />
          </FormField>

          <FormField name='plan'>
            <FormLabel required>요금제 선택</FormLabel>
            <FormRadioGroup>
              <FormRadio value='basic'>베이직</FormRadio>
              <FormRadio value='pro'>프로</FormRadio>
            </FormRadioGroup>
            <FormHint />
          </FormField>

          <FormField name='description'>
            <FormLabel required>자기소개</FormLabel>
            <FormTextArea maxLength={300} placeholder='입력해주세요' showCount />
            <FormHint />
          </FormField>

          <FormField name='interests'>
            <FormLabel>관심사</FormLabel>
            <FormCheckboxGroup>
              <FormCheckboxItem value='tech'>기술</FormCheckboxItem>
              <FormCheckboxItem value='design'>디자인</FormCheckboxItem>
              <FormCheckboxItem value='business'>비즈니스</FormCheckboxItem>
            </FormCheckboxGroup>
            <FormHint />
          </FormField>

          <FormField name='agreement'>
            <FormLabel required>약관 동의</FormLabel>
            <FormCheckbox>이용 약관에 동의합니다</FormCheckbox>
            <FormHint />
          </FormField>

          <FormField name='images'>
            <FormLabel required>상품 이미지</FormLabel>
            <FormControl>
              {(field) => (
                <FormImageUpload
                  maxFiles={5}
                  mode='append'
                  multiple
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            </FormControl>
            <FormHint />
          </FormField>

          <FormField name='repeat'>
            <FormLabel required>반복</FormLabel>
            <FormControl>
              {(field) => (
                <FormSelect
                  listMap={[
                    { value: 'never', children: '반복 없음' },
                    { value: 'once', children: '한번' },
                    { value: 'infinite', children: '무한' },
                  ]}
                  placeholder='값을 선택해주세요'
                  value={field.value}
                  onValueChange={field.onChange}
                />
              )}
            </FormControl>
            <FormHint />
          </FormField>

          <FormField name='date'>
            <FormLabel required>날짜 선택</FormLabel>
            <FormControl>
              {(field) => (
                <FormDatePicker value={field.value} onChange={field.onChange}>
                  <FormDatePicker.Trigger placeholder='날짜를 입력해주세요' />
                  <FormDatePicker.Content />
                </FormDatePicker>
              )}
            </FormControl>
            <FormHint />
          </FormField>

          <button>출력</button>
        </form>
      </FormProvider>
    </div>
  );
};

export default Home;

```
</details>

## ui
<details>
  <summary><h4>Dropdown</h4></summary>

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
  <summary><h4>Tabs</h4></summary>

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
  <summary><h4>Select</h4></summary>

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

<details>
  <summary><h4>Modal</h4></summary>

  ```tsx
  const Modal = () => {
    return (
      <ModalContent className='flex h-100 w-100 flex-col items-center justify-center bg-white'>
        <ModalTitle className='sr-only'>다이얼로그 제목입니다</ModalTitle>
        <ModalDescription className='sr-only'>다이얼로그 설명입니다</ModalDescription>
        <input />
        <input />
        <input />
        <ModalCloseButton>닫기</ModalCloseButton>
      </ModalContent>
    );
  };
  
  const Home = () => {
    const { open } = useModal();
  
    return <button onClick={() => open(<Modal />)}>모달 열기</button>;
  };

  ```
</details>
