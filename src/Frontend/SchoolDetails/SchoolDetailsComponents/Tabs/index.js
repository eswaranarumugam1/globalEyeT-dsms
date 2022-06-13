export default function Tabs({tabs, handleChange}) {
  return (
    <ul className='tabs'>
        {
            tabs && tabs.map((x) => {
                return (
                    <li key={x.key} className={tab === x.key ? 'active-tab' : ''} onClick={() => handleChange(x.key)}>{x.label}</li>
                )
            })
        }
        
    </ul>
  )
}
