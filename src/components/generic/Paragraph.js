const Paragraph = ({value, className, dangerouslySetInnerHTML}) => {
  if (dangerouslySetInnerHTML) {
    return (
      <p className={className} dangerouslySetInnerHTML={{__html: value}}></p>
    )
  }

  return <p className={className}>{value}</p>
}

export default Paragraph
