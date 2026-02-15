import { Link } from 'react-router'
import styles from './HomePage.module.css'

function HomePage() {
  return (
    <section>
      <Link className={styles.link} to="/games">
        View Games Database
      </Link>
    </section>
  )
}

export default HomePage
