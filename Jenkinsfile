pipeline {
    agent any
    environment {
        DOCKERHUB_USER = 'hieptvh18'
        IMAGE_NAME = 'profile-nestjs-api-vti'
        PATH = "/usr/local/bin:/usr/bin:/bin:${env.PATH}"
    }
    triggers {
        githubPush()
    }

    stages {
        stage('Debug - Check Docker') {
            steps {
                sh '''
                echo "=== Checking Docker ==="
                which docker || echo "Docker not found in PATH"
                docker --version || echo "Docker command failed"
                echo "PATH: $PATH"
                echo "USER: $(whoami)"
                ls -la /var/run/docker.sock || echo "Docker socket not found"
                '''
            }
        }

        stage('Checkout') {
            steps {
                script {
                    git branch: 'main', 
                        url: 'https://github.com/hieptvh18/profile-nestJs.git',
                        credentialsId: 'github_pat'
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    sh """
                        docker build -t ${DOCKERHUB_USER}/${IMAGE_NAME}:${BUILD_NUMBER} .
                        docker tag ${DOCKERHUB_USER}/${IMAGE_NAME}:${BUILD_NUMBER} ${DOCKERHUB_USER}/${IMAGE_NAME}:latest
                    """
                }
            }
        }

        stage('Push to DockerHub') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'dockerhub_pat', usernameVariable: 'DOCKERHUB_USERNAME', passwordVariable: 'DOCKERHUB_PASSWORD')]) {
                        sh """
                            echo \${DOCKERHUB_PASSWORD} | docker login -u \${DOCKERHUB_USERNAME} --password-stdin
                            docker push ${DOCKERHUB_USER}/${IMAGE_NAME}:${BUILD_NUMBER}
                        """
                    }
                }
            }
        }

        stage('Update GitOps Repo') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'github_pat', usernameVariable: 'GIT_USERNAME', passwordVariable: 'GIT_PASSWORD')]) {
                        sh '''
                        rm -rf assignment-devops-k8s
                        git clone https://${GIT_USERNAME}:${GIT_PASSWORD}@github.com/hieptvh18/assignment-devops-k8s.git
                        cd assignment-devops-k8s/apps/be
                        sed -i "s|image:.*|image: ${DOCKERHUB_USER}/${IMAGE_NAME}:${BUILD_NUMBER}|g" deployment.yaml
                        git config user.email "hieptvh18@gmail.com"
                        git config user.name "hieptvh18"
                        git add .
                        git diff --cached --quiet || git commit -m "update image to build ${BUILD_NUMBER}"
                        git push https://${GIT_USERNAME}:${GIT_PASSWORD}@github.com/hieptvh18/assignment-devops-k8s.git
                        '''
                    }
                }
            }
        }

        stage('Complete') {
            steps {
                echo 'Complete'
            }
        }
    }
}