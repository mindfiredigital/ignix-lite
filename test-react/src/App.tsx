import { Button, Checkbox, Input , Radio, Select, TextArea, Dialog, Alert, Badge, Card, Accordion, Avatar, Code, Divider, Form, Progress, Meter, Navigation, Skeleton, Table, Combobox, Dropdown, Tabs, Toast, Tooltip} from '@ignix-lite/react'
import type { ToastRef } from '@ignix-lite/react' 
import { useRef } from 'react' 
export default function App() {
  const toastRef = useRef<ToastRef>(null)
  return (
    <>
    <Button intent="primary">Primary</Button>
    <Button intent="danger">Danger</Button>
    <Button intent="warning">Warning</Button>
    <Button intent="success">Success</Button>
    <Button intent="neutral">Neutral</Button>
    <Button intent="gradient">Gradient</Button>
    <Button intent="ghost">Ghost</Button>
    <Button intent="primary" disabled>Disabled</Button>
    <Button intent="primary" loading><span>Loading</span></Button>

    <Input label="Email" type="email" required intent="primary" />
    <Input label="Warning field" type='email' intent="warning" />
    <Input label="Error field" type='date' invalid />
    <Input label='Diasbled'  disabled />

    <TextArea label="Primary" intent="primary"></TextArea>
    <TextArea label="Warning" intent="warning"></TextArea>
    <TextArea label="Diasabled" disabled></TextArea>
    <TextArea label="Invalid" invalid></TextArea>
    <TextArea label='2 rows' rows={2}></TextArea>
    <TextArea label='4 rows' rows={4}></TextArea>

      <section>
        <h3>Select</h3>
        <Select label="Choose framework" intent="primary">
          <option>React</option>
          <option>Vue</option>
          <option>Angular</option>
        </Select>

        <Select label="Warning Select" intent="warning">
          <option>Option 1</option>
          <option>Option 2</option>
        </Select>

        <Select label="Ivalid" intent="neutral" invalid>
          <option>Error</option>
        </Select>

        <Select label="Multiple Select" multiple>
          <option>React</option>
          <option>Vue</option>
          <option>Angular</option>
        </Select>
      </section>

      <section>
        
      <h3>Checkbox</h3>

      <Checkbox label="Accept terms" />
      <Checkbox label="Subscribe" defaultChecked />
      <Checkbox label="Disabled" disabled />

      </section>

      <section>
        
      <h3>Radio</h3>

      <Radio name="framework" label="React" />
      <Radio name="framework" label="Vue" />
      <Radio name="framework" label="Angular" />

      <Radio name="plan" label="Free" defaultChecked />
      <Radio name="plan" label="Pro" />
      <Radio name="plan" label="Enterprise" disabled />


      </section>

      <Button
        onClick={() =>
          (document.getElementById("confirmDialog") as HTMLDialogElement)?.showModal()
        }
      >
        Delete Item
      </Button>

      <Dialog id="confirmDialog" intent="danger">
        <h2>Confirm Delete</h2>
        <p>Are you sure you want to delete this item?</p>
        <p>This action cannot be undone</p>

        <Button
          onClick={() =>
            (document.getElementById("confirmDialog") as HTMLDialogElement)?.close()
          }
        >
          Cancel
        </Button>

        <Button
          intent="danger"
          onClick={() =>
            (document.getElementById("confirmDialog") as HTMLDialogElement)?.close()
          }
        >
          Delete
        </Button>
      </Dialog>

      {/* Warning Dialog */}
      <Button
        onClick={() =>
          (document.getElementById("warn") as HTMLDialogElement)?.showModal()
        }
      >
        Open Warning
      </Button>

      <Dialog id="warn" intent="warning">
        <h2>Warning</h2>
        <p>You have unsaved changes</p>
        <p>If you leave now, your progress will be lost</p>

        <Button onClick={() => (document.getElementById("warn") as HTMLDialogElement)?.close()}>
          Close
        </Button>
        <Button onClick={() => (document.getElementById("warn") as HTMLDialogElement)?.close()}>
          Continue
        </Button>
      </Dialog>

      {/* Info Dialog */}
      <Button
        onClick={() =>
          (document.getElementById("info") as HTMLDialogElement)?.showModal()
        }
      >
        Open Info
      </Button>

      <Dialog id="info" intent="info">
        <h2>Info</h2>
        <p>Your session will expire in 2 minutes.</p>
        <p>Please save your work.</p>

        <Button onClick={() => (document.getElementById("info") as HTMLDialogElement)?.close()}>
          Close
        </Button>
        <Button onClick={() => (document.getElementById("info") as HTMLDialogElement)?.close()}>
          Save
        </Button>
      </Dialog>
    
    <Alert>Default alert message</Alert>

      <Alert intent="danger">
        Something went wrong
      </Alert>

      <Alert intent="warning">
        Please review before continuing
      </Alert>

      <Alert intent="success">
        Saved successfully
      </Alert>

      <Alert intent="info">
        Informational message
      </Alert>

            <Badge>Neutral</Badge>

      <Badge intent="danger">Danger</Badge>
      <Badge intent="warning">Warning</Badge>
      <Badge intent="success">Success</Badge>
      <Badge intent="neutral">Neutral</Badge>

      <Badge status intent="success">
        Active
      </Badge>

      <Badge intent="warning">
        Very Long Badge Text
      </Badge>

      <Card>
      <img
        slot="avatar"
        src="https://i.pinimg.com/236x/da/fd/f2/dafdf25168edcb2f0e1d8702797946cc.jpg"
        alt="User"
      />

      <span slot="title">Neha Sharma</span>

      <span slot="meta">Frontend Developer</span>

      <p slot="body">
        Building accessible UI components.
      </p>

      <button slot="action">Follow</button>

      <span slot="footer">Joined 2024</span>
    </Card>

    <Accordion>
      <summary>What is ignix-lite?</summary>
      <p>A minimal UI library built for agents and developers.</p>
    </Accordion>

    <Accordion open>
      <summary>How does this work?</summary>
      <p>Uses native HTML details and summary elements.</p>
    </Accordion>

    <Accordion>
    <summary>What is ignix-lite?</summary>
    <p>A minimal UI library.</p>
  </Accordion>

  <Accordion>
    <summary>Is it accessible?</summary>
    <p>Yes, it uses native browser behavior.</p>
  </Accordion>

  <Accordion>
    <summary>Does it require JS?</summary>
    <p>No, it works without JavaScript.</p>
  </Accordion>

      <Avatar src="https://picsum.photos/100" alt="User" />

      <Avatar size="sm" src="https://picsum.photos/100" />
      <Avatar size="md" src="https://picsum.photos/100" />
      <Avatar size="lg" src="https://picsum.photos/100" />

      
      <Avatar fallback size="md">
        JD
      </Avatar>

      <Code lang="js">
{`function greet() {
  console.log("Hello world")
}`}
      </Code>

      <Code lang="python">
{`def greet():
  print("Hello")`}
      </Code>

      <Code lang="bash">
{`npm install ignix-lite`}
      </Code>

      <p>Section 1</p>
      <Divider />
      <p>Section 2</p>

      <section style={{ display: "flex", alignItems: "center", height: 40 }}>
        <span>Item</span>
        <Divider orientation="vertical" />
        <span>Item</span>
      </section>

      <Form onSubmit={(e) => e.preventDefault()}>
      <label>
        Name
        <Input name="name" />
      </label>

      <label>
        Email
        <Input type="email" name="email" />
      </label>

      <label>
        Password
        <Input type="password" name="password" />
      </label>

      <Button type="submit">Submit</Button>
    </Form>

    <Form loading onSubmit={(e) => e.preventDefault()}>
  <label>
    Email
    <Input type="email" name="email" />
  </label>

  <Button type="submit">Submitting...</Button>
</Form>

<Form onSubmit={(e) => e.preventDefault()}>
  <label data-state="error">
    Email
    <Input type="email" value="invalid-email" invalid />
    <small>Please enter a valid email address.</small>
  </label>
</Form>

      <Progress value={72} max={100} />

      <Progress value={0} max={100} />
      <Progress value={50} max={100} />
      <Progress value={100} max={100} />


      <Meter value={20} min={0} max={100} low={30} high={70} optimum={100} />

      <Meter value={20} min={0} max={100} low={30} high={70} optimum={100} />
      <Meter value={40} min={0} max={100} low={30} high={70} optimum={100} />
      <Meter value={80} min={0} max={100} low={30} high={70} optimum={100} />

      <Navigation>
        <ul>
          <li><a href="#" aria-current="page">Home</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </Navigation>

      <Navigation>
        <ul>
          <li><a href="#" aria-current="page">Dashboard</a></li>
          <li><a href="#">Projects</a></li>
          <li><a href="#">Settings</a></li>
          <li><a href="#">Profile</a></li>
        </ul>
      </Navigation>

      <Skeleton shape="text" />
      <br /><br />

      <Skeleton shape="rect" />
      <br /><br />

      <Skeleton shape="circle" />

      
      <Skeleton shape="text" lines={3} />
      <Skeleton shape="text" />
      <Skeleton shape="text" />

      <Table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td>John</td>
          <td>john@example.com</td>
        </tr>

        <tr>
          <td>Jane</td>
          <td>jane@example.com</td>
        </tr>
      </tbody>
    </Table>

    <Table data-sortable>
  <thead>
    <tr>
      <th aria-sort="ascending">Name</th>
      <th aria-sort="descending">Email</th>
      <th aria-sort="none">Role</th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>Jane</td>
      <td>jane@example.com</td>
      <td>Admin</td>
    </tr>

    <tr>
      <td>John</td>
      <td>john@example.com</td>
      <td>User</td>
    </tr>
  </tbody>
</Table>

<Combobox intent="primary">
  <label part="control">
    <input placeholder="Primary..." />
    <button data-clear>Clear</button>
  </label>
  <ul>
    <li>Apple</li>
    <li>Banana</li>
  </ul>
</Combobox>

<Combobox intent="success">
  <label part="control">
    <input placeholder="Success..." />
    <button data-clear>Clear</button>
  </label>
  <ul>
    <li>Node</li>
    <li>Express</li>
  </ul>
</Combobox>

<Combobox intent="warning">
  <label part="control">
    <input placeholder="Warning..." />
    <button data-clear>Clear</button>
  </label>
  <ul>
    <li>Check Input</li>
    <li>Validate Data</li>
  </ul>
</Combobox>

<Combobox intent="danger">
  <label part="control">
    <input placeholder="Danger..." />
    <button data-clear>Clear</button>
  </label>
  <ul>
    <li>Delete</li>
    <li>Remove</li>
  </ul>
</Combobox>

<Combobox intent="gradient">
  <label part="control">
    <input placeholder="Gradient..." />
    <button data-clear>Clear</button>
  </label>
  <ul>
    <li>Cool UI</li>
    <li>Fancy Option</li>
  </ul>
</Combobox>

<h2>Basic</h2>

      <Dropdown>
        <button slot="trigger">Options ▾</button>
        <ul slot="menu">
          <li><button>Profile</button></li>
          <li><button>Settings</button></li>
        </ul>
      </Dropdown>

      <h2>Variants</h2>

      <Dropdown intent="primary">
        <button slot="trigger">Primary ▾</button>
        <ul slot="menu">
          <li><button>Dashboard</button></li>
          <li><button>Profile</button></li>
        </ul>
      </Dropdown>

      <Dropdown intent="success">
        <button slot="trigger">Success ▾</button>
        <ul slot="menu">
          <li><button>Saved</button></li>
          <li><button>Completed</button></li>
        </ul>
      </Dropdown>

      <Dropdown intent="danger">
        <button slot="trigger">Danger ▾</button>
        <ul slot="menu">
          <li><button>Delete</button></li>
          <li><button>Remove</button></li>
        </ul>
      </Dropdown>

      <Dropdown intent="ghost">
        <button slot="trigger">Ghost ▾</button>
        <ul slot="menu">
          <li><button>Item 1</button></li>
          <li><button>Item 2</button></li>
        </ul>
      </Dropdown>

      <Dropdown intent="gradient">
        <button slot="trigger">Gradient ▾</button>
        <ul slot="menu">
          <li><button>Cool</button></li>
          <li><button>Modern</button></li>
        </ul>
      </Dropdown>

            <h2>Default</h2>

      <Tabs>
        <button slot="tab">Overview</button>
        <button slot="tab">Analytics</button>
        <button slot="tab">Settings</button>
      </Tabs>

      <h2>Underline</h2>

      <Tabs variant="underline">
        <button slot="tab">Profile</button>
        <button slot="tab">Activity</button>
        <button slot="tab">Security</button>
      </Tabs>

      <h2>Pill</h2>

      <Tabs variant="pill">
        <button slot="tab">Files</button>
        <button slot="tab">Shared</button>
        <button slot="tab">Starred</button>
      </Tabs>

      <h2>Gradient</h2>

      <Tabs variant="gradient">
        <button slot="tab">Home</button>
        <button slot="tab">Dashboard</button>
        <button slot="tab">Reports</button>
      </Tabs>

      <Toast ref={toastRef} position="top-right" />

      <button
        onClick={() =>
          toastRef.current?.show({
            title: "Saved",
            message: "Your data updated successfully",
            intent: "success"
          })
        }
      >
        Success Toast
      </button>

      <button
        onClick={() =>
          toastRef.current?.show({
            title: "Error",
            message: "Something went wrong",
            intent: "danger",
            variant: "pop"
          })
        }
      >
        Error Toast
      </button>

      <button
        onClick={() =>
          toastRef.current?.show({
            title: "Warning",
            message: "Check your inputs",
            intent: "warning",
            variant: "slide"
          })
        }
      >
        Warning Toast
      </button>

<h2>Tooltip - Basic</h2>

      <Tooltip content="Hello tooltip">
        <Button>Hover me</Button>
      </Tooltip>

      {/* Positions */}
      <h2>Positions</h2>

      <Tooltip content="Top tooltip">
        <Button>Top</Button>
      </Tooltip>

      <Tooltip content="Bottom tooltip" position="bottom">
        <Button>Bottom</Button>
      </Tooltip>

      <Tooltip content="Left tooltip" position="left">
        <Button>Left</Button>
      </Tooltip>

      <Tooltip content="Right tooltip" position="right">
        <Button>Right</Button>
      </Tooltip>

      {/* Intents */}
      <h2>Intent Variants</h2>

      <Tooltip content="Success tooltip" intent="success">
        <Button>Success</Button>
      </Tooltip>

      <Tooltip content="Danger tooltip" intent="danger">
        <Button>Danger</Button>
      </Tooltip>

      <Tooltip content="Warning tooltip" intent="warning">
        <Button>Warning</Button>
      </Tooltip>

      {/* Accessibility */}
      <h2>Accessibility</h2>

      <Tooltip content="Accessible tooltip">
        <Button>Focus me (Tab)</Button>
      </Tooltip>
    </>
  )
}