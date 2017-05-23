package com.repo.dao.data;

import com.repo.dao.pojo.Audit;
import com.repo.dao.pojo.Comment;
import com.repo.dao.pojo.User;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.criterion.Projection;
import org.hibernate.criterion.Projections;

import javax.persistence.Query;
import javax.persistence.criteria.CriteriaBuilder;
import java.util.*;

/**
 * Created by ali_jalbani on 5/19/17.
 */
public class CommentDaoHelper {

    public static List<Comment> getAllComments(){
        List<Comment> allComments = new ArrayList<>();
        Session session = null;
        try{
            SessionFactory sessionFactory = HibernateUtil.getSessionFactory();
            session = sessionFactory.openSession();

            Query query = session.createQuery("from Comment");
            allComments = query.getResultList();

        }catch (Exception e){
            e.printStackTrace();
        }finally {
            session.close();
            return allComments;
        }
    }

    public static void saveComments(String id, String comment, String reason, String mitigation){
        Session session = null;
        try{
            SessionFactory sessionFactory = HibernateUtil.getSessionFactory();
            session = sessionFactory.openSession();
            Transaction tx = session.beginTransaction();

            Comment comment2 = session.get(Comment.class, id);
            Map<String, String> changedValues = new HashMap<>();
            if(! comment2.getComment().equals(comment)){
                changedValues.put("comment", comment);
            }
            if(! comment2.getMitigation().equals(mitigation)){
                changedValues.put("mitigation", mitigation);
            }
            if(! comment2.getReason().equals(reason)){
                changedValues.put("reason", reason);
            }
            session.evict(comment2);
            session.flush();

            Set<String> mapKeys = changedValues.keySet();
            if(!mapKeys.isEmpty()){
                for(String key : mapKeys){
                    Audit a = new Audit();
                    //TODO: replace 1 with user_id
                    a.setId(0);
                    a.setUser(session.load(User.class, 1));
                    a.setComment(comment2);
                    a.setColumn_edited(key);
                    a.setColumn_newvalue(changedValues.get(key));

                    session.save(a);
                }
                Comment comment1 = new Comment();
                comment1.setId(id);
                comment1.setComment(comment);
                comment1.setReason(reason);
                comment1.setMitigation(mitigation);
                session.saveOrUpdate(comment1);
            }
            tx.commit();

        }catch(Exception e){
            System.out.println(e);
        }finally{
            session.close();
        }
    }

    public static List<Object> getDistinctColumn(String column){
        Session session = null;
        List<Object> uniqueComments = new ArrayList<>();
        try{
            SessionFactory sessionFactory = HibernateUtil.getSessionFactory();
            session = sessionFactory.openSession();

            uniqueComments = session.createQuery(
                    "SELECT DISTINCT c." + column + " " +
                            "FROM Comment c " + " " +
                    "WHERE c." + column + " !=''" , Object.class )
                    .getResultList();

            System.out.println(uniqueComments);

        }catch(Exception e){

        }finally{
            session.close();
            return uniqueComments;
        }
    }
}

